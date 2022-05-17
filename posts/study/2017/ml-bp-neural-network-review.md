---
title: "机器学习-神经网络（反向传播算法）学习总结"
date: 2017-05-17T08:37:37+08:00
tags:
  - ml
  - review
author: dyzdyz010
collection: study
---

今天下午完成了Andrew Ng的机器学习课程第五周的课程，完成了自己实现一个基本神经网络的编程作业，不得不说神经网络的运算量真大啊，我的CPU温度都快上100了……

第四周与第五周共两周的内容讲了神经网络的由来和表示方法以及实现方法。

## 为什么要使用神经网络

与之前学过的逻辑回归相比，在逻辑回归的假设函数 $h_\theta(x)$ 中：

$$
g(z) = \frac{1}{1+e^{-z}}
$$

$$
z = \theta^Tx
$$

可以看到，$z$ 的形式是线性的，这意味着你只能拟合这样的数据：

![](@blogimg/2017/05/006tNc79ly1fezv6qgjh4j30ik0fw0uz.jpg)

**即：** 决策边界只用一次方程就可以表示

或者是这样的数据：

![](@blogimg/2017/05/006tNc79ly1ff07vikxvbj30si0m6dhz.jpg)

**即：** 特征数量不多，可以通过添加高次项的方法形成不规则的决策边界。

但是如果你需要识别一张图片中是否有车辆出现：

![](@blogimg/2017/05/006tKfTcly1ffgddiiuihj31bs0oi78s.jpg)

假设用作样本的图片只有 $50\times50$ 像素大小，这样的话你可能输入的特征数量就是 $50\times50=2500$ 个（只用灰度值，如果用RGB表示的话特征数量会变成 $2500\times3=7500$ 个），这还只是**全部是一次方项**的情况，但如果需要的决策边界是形如这样的：

![](@blogimg/2017/05/006tKfTcly1ffgdhtx31oj30tg0l0abd.jpg)

你需要一个不规则的决策边界表示方法，这时你可能会引入高次项，即使只增加二次项：

$$
x_ix_j
$$

这样的话特征数量就会变成：

$$
\frac{(1+2500)\times2500}{2} \approx 3,000,000
$$

用这个数量级的特征去做逻辑回归，计算量是非常恐怖的。因此需要一种能够降低运算量的模型来避免这种问题的出现。

**神经网络(Neural Network)**受启发于人类大脑。我们知道，人类的大脑就是通过无数的神经元之间互相传递信息来工作的。**神经元(Neuron)**是这其中的信号传递单元，形如下图：

![](@blogimg/2017/05/006tKfTcly1ffgduhpdk7j31800qcq76.jpg)

可以看到，神经元可以接收与其相连接的神经元的信号，自身对其进行处理，然后将信号再发送给其他与自己相连的神经元。受此启发，我们得到了工作方式类似的神经元模型：

![](@blogimg/2017/05/006tKfTcly1ffge177ljfj30ue0jg410.jpg)

可以看到，橙色的节点接受左边三个节点的输入，并计算出我们需要的输出值 $h_\theta(x)$。其中 $x_0$ 是所谓的**偏置单元(bias unit)**。我们把输入表示为：

$$
x = \begin{bmatrix}
x_0 \\ 
x_1 \\ 
x_2 \\ 
x_3
\end{bmatrix} \qquad 
\theta = \begin{bmatrix}
\theta_0 \\ 
\theta_1 \\ 
\theta_2 \\ 
\theta_3
\end{bmatrix}
$$

其中，$x$ 代表左侧四个单元的值，用于输入到下一个单元中，而 $\theta$ 代表每个输入值进行输入时的 **权重(weight)** ，即上图中的线条，你可以简单地理解为每个输入值进行传递时的**重要性/优先级/影响力**；对于输出 $h_\theta(x)$，即神经元自身的计算方式，我们依然使用之前的激活函数(Sigmoid)。

有了神经元的模型后，我们就可以以此为基础，对其进行复制和组合，就得到了我们现在使用的分层神经网络(三层)：

![](@blogimg/2017/05/006tKfTcly1ffgeqy8sd4j31f60teq9m.jpg)

左边的**第一层**依然是用于输入特征$x$的单元组合；中间的**第二层**叫做**隐含层(hidden layer)**，这一层接受上一层的输入，经过计算(激活函数)，并将计算结果传递给下一层；右边的**第三层**用于计算出最终结果 $h_\theta(x)$。从图上可以看出，前两层的偏执单元只有在当作输入进行下一层的计算时才会使用，从图上可以看出，$x_0$ 与第二层并没有线(权值)相连，意味着当第一层在计算时，只会输出 $a_1, a_2, a_3$，而并没有 $a_0$。

有了这样的神经网络模型，我们就可以通过这样的计算来获取假设函数 $h_\theta(x)$ 的值：

$$
\begin{aligned}
a^{(2)}_1 &=& g(\Theta^{(1)}_{10} x_0 + \Theta^{(1)}_{11} x_1 + \Theta^{(1)}_{12} x_2 + \Theta^{(1)}_{13} x_3) \\ 
a^{(2)}_2 &=& g(\Theta^{(1)}_{20} x_0 + \Theta^{(1)}_{21} x_1 + \Theta^{(1)}_{22} x_2 + \Theta^{(1)}_{23} x_3) \\ 
a^{(2)}_3 &=& g(\Theta^{(1)}_{30} x_0 + \Theta^{(1)}_{21} x_1 + \Theta^{(1)}_{32} x_2 + \Theta^{(1)}_{33} x_3) \\ 
h_\Theta(x) &=& a^{(3)}_1 = g(\Theta^{(2)}_{10} a^{(2)}_0 + \Theta^{(2)}_{11} a^{(2)}_1 + \Theta^{(2)}_{12} a^{(2)}_2 + \Theta^{(2)}_{13} a^{(3)}_0)
\end{aligned}
$$

其中：$g(z)$ 就是我们的激活函数Sigmoid， $a^{(l)}_i$ 为网络中第 $l$ 层中第 $i$ 个节点的**激活值(Activation)**，$\Theta^{(l)}$ 为网络中第 $l$ 层的节点值向第 $l+1$ 层节点变换时的权值矩阵。如果在第 $l$层有 $S_l$ 个节点，在第 $l+1$ 层有 $S_{l+1}$ 个节点，那么第 $l$ 层的权值矩阵 $\Theta$ 的大小为 $S_{j+1} \times S_j + 1$，即：行数代表 $j+1$ 层的节点个数，列数代表 $l$ 层的节点个数，列数**+1**的原因是在计算 $l+1$ 层时，$l$层增加了一个偏置单元 $x_0$。

我们进一步对上面的公式向量化：

$$
\begin{aligned}
z^{(2)} &= \Theta^{(1)} a^{(1)} & (a^{(1)} = x) \\ 
a^{(2)} &= g(z^{(2)}) & (a^{(2)}_{3 \times 1}) \\ 
Add \ a^{(2)}_0 &= 1 & (a^{(2)}_{4 \times 1}) \\ 
z^{(3)} &= \Theta^{(2)} a^{(2)} \\ 
h_\Theta(x) &= a^{(3)} = g(z^{(3)})
\end{aligned}
$$

需要注意的是，上面的例子只是神经网络中最简单的结构，只有一层 **隐含层** ，一个 **输出单元**  ，而这些包括 **输入层的节点数量** 都可以根据问题的不同而变得更复杂，比如下面这个：

![](@blogimg/2017/05/006tKfTcgy1ffialq260ej30yq0audiq.jpg)

可以看到，这里面有2个隐含层，每层5个节点，输出层有4个节点。在这里，如果我们是在拟合一个多分类问题，那么输出层的每个节点就可以看作是一个目标分类，节点的值(Sigmoid)看作输入样例属于这个分类的概率，那么我们最终得到的假设函数就是这样的：

$$
h_\Theta(x) \approx \begin{bmatrix}
1 \\ 
0 \\ 
0 \\ 
0 \end{bmatrix}, \quad 
h_\Theta(x) \approx \begin{bmatrix}
0 \\ 
1 \\ 
0 \\ 
0 \end{bmatrix}, \quad 
h_\Theta(x) \approx \begin{bmatrix}
0 \\ 
0 \\ 
1 \\ 
0 \end{bmatrix}, \quad 
h_\Theta(x) \approx \begin{bmatrix}
0 \\ 
0 \\ 
0 \\ 
1 \end{bmatrix}, etc.
$$

其表示为一个列向量，为1的位置就是最终得到的所属分类。

设样本集为：

$$
{(x^{(1)}, y^{(1)}), (x^{(1)}, y^{(1)}), \ldots, (x^{(m)}, y^{(m)})}
$$

其中，$m$ 为样本数量。我们再设 $L$ 为神经网络的总层数，$S_l$ 为第 $l$ 层包含的节点数量 **(不包括偏执单元)。 **对于输出层 $y$，如果只有一个节点，即 *只将样本分为两类* ，那么有 $y=0 \parallel y=1$；如果有多个节点，即**最终要将样本分入多个类别中的一个** ，那么就有 $y \in \mathbb{R}^K$ ($K$ 为总分类数)，即上图中的 $h_\Theta(x)$。

根据逻辑回归中的代价函数：

$$
J(\theta) = -\frac{1}{m} \left[\sum_{i=1}^{m} y^{(i)} \log h_\theta(x^{(i)}) + (1 - y^{(i)}) \log (1 - h_\theta(x^{(i)}))\right] + \frac{\lambda}{2m} \sum_{j=1}^{n} \theta^2_j
$$

类似地，神经网络的代价函数(正规化后)为：

$$
\begin{aligned}
J(\Theta) = -&\frac{1}{m} \left[ \sum_{i=1}^{m} \sum_{k=1}^{K} y_k^{(i)} \log (h_\Theta(x^{(i)}))_k + (1 - y_k^{(i)}) \log (1 - (h_\Theta(x^{(i)}))_k) \right] \\ 
+& \frac{\lambda}{2m} \sum_{l=1}^{L-1} \sum_{i=1}^{S_l} \sum_{j=1}^{S_{l+1}} (\Theta_{ji}^{(l)})^2
\end{aligned}
$$

其中，在前一部分(非正规化的代价函数)中，$m$ 为样本数量，$K$ 为输出层的节点数(即总共的类别数)；在后一部分(正规化项)中，$i$ 为第 $l$ 层的节点数量，$j$ 为第 $l+1$ 层的节点数量。**注意：此处的正规化项中的 $\Theta$ 不包含每层和偏置单元相连的权值，即 $\Theta^{(l)}$ 矩阵中的第一列。**

可以看出，两个代价函数的形式基本一致。 **不同的地方在于** ，由于神经网络的代价函数针对多个分类的情况一般化了，所以在公式中多一个求和的符号(即 $\sum_{k=1}^{K}$)，意味着需要将最终得出的概率向量 $y$ 的各分量进行求和。

有了代价函数，为了利用梯度下降等方法对 $\Theta$ 进行更新，我们还需要求得各个 $\Theta$ 分量的偏导数，即：

$$
\frac{\partial}{\partial \ \Theta_{ij}^{(l)}} J(\Theta)
$$

要想计算偏导数，给定下面的神经网络：

![](http://7vztwe.com1.z0.glb.clouddn.com/20170512149457918939786.jpg?imageView2/0/format/jpg)

给定一条训练样本 $(x, y)$，首先需要计算 $h_\Theta(x)$ (即 **前向传播(Forward propagation)** )：

$$
\begin{aligned}
a^{(1)} &= x \\ 
z^{(2)} &= \Theta^{(1)}a^{(1)} \\ 
a^{(2)} &= g(z^{(2)}) \quad (add \ a_0^{(2)}) \\ 
z^{(3)} &= \Theta^{(2)}a^{(2)} \\ 
a^{(3)} &= g(z^{(3)}) \quad (add \ a_0^{(3)}) \\ 
z^{(4)} &= \Theta^{(3)}a^{(3)} \\ 
a^{(4)} &= h_\Theta(x) = g(z^{(4)})
\end{aligned}
$$

计算出 $h_\Theta(x)$ 后，我们就可以使用 **反向传播算法(Back propagation)** 来计算偏导数了。在这里我们引入一个 **误差值(error)** 的概念，顾名思义，就是我们计算得出的结果与实际样本中给定的结果之间的误差。例如对于上面的网络结构中的输出层来说，误差值的计算方法为：

$$
\delta^{(4)} = a^{(4)} - y
$$

依此类推，向输入层的方向计算各层的误差值：

$$
\begin{aligned}
\delta^{(3)} &= (\Theta^{(3)})^T \delta^{(4)} \ .* \ g'(z^{(3)}), \qquad g'(z^{(3)}) = a^{(3)} \ .* \ (1 - a^{(3)}) \\ 
\delta^{(2)} &= (\Theta^{(2)})^T \delta^{(3)} \ .* \ g'(z^{(2)})
\end{aligned}
$$

对于每个样例 $(x, y)$，反向传播算法的流程如下：

+ 设 $\Delta^{(l)}_{ij} = 0$
+ 令 $a^{(1)} = x$
+ 利用前向传播为后面的每一层 $l = 2, 3, \ldots, L$ 计算 $a^{(l)}$
+ 计算输出层的误差值 $\delta^{(L)} = a^{(L)} - y$
+ 计算前面 **除了输入层** 外每一层的误差值 $\delta^{(l)} \ (l = 2, 3, \ldots, L-1)$
+ $\Delta^{(l)}_{ij} = \Delta^{(l)}_{ij} + a^{(l)}_j \delta^{(l+1)}_i$

此时的 $\frac{1}{m} \Delta^{(l)}_{ij}$ 就是偏导数 $\frac{\partial}{\partial \ \Theta_{ij}^{(l)}} J(\Theta)$(未正规化)。

对其进行正规化后的形式为：

$$
\begin{aligned}
\left\{
\begin{array}{l}
D^{(l)}_{ij} &=& \frac{1}{m} \Delta^{(l)}_{ij} + \lambda \Theta^{(l)}_{ij} \quad & if \ j \neq 0& \\[3ex]
D^{(l)}_{ij} &=& \frac{1}{m} \Delta^{(l)}_{ij} & if \ j = 0&
\end{array}
\right.
\end{aligned}
$$

最终偏导数为：

$$
\frac{\partial}{\partial \ \Theta_{ij}^{(l)}} J(\Theta) = D^{(l)}_{ij}
$$

至此，神经网络的训练及使用方法就讲完了。在用 Matlab 实现的过程中，由于其自带的迭代函数`fminunc(@costFun, initialTheta, options)`中的`initialTheta`，以及需要的代价函数`function [jval, gradientVec] = costFun(thetaVec)`中的`gradientVec`被要求是向量(Vector)形式，但是在神经网络计算的 $\Theta$、$D^{(l)}$都是矩阵，因此需要将其转换为一维形式，在需要的时候再将其转换回矩阵：

```
% 转换为一维向量
thetaVec = [Theta1(:); Theta2(:); Theta3(:)];
DVec = [D1(:); D2(:); D3(:)];

% 转换回矩阵形式
Theta1 = reshape(thetaVec(1:x1*y1), row1, col1);
Theta1 = reshape(thetaVec(x1*y1+1:x2*y2), row2, col2);
Theta1 = reshape(thetaVec(x2*y2+1:x3*y3), row3, col3);
```

为了保证你实现的反向传播算法(即求偏导)是对的，我们可以将实现的算法计算出的偏导数同用从定义实现的偏导数结果进行比较，如果两者非常接近，那么说明你的实现就是正确的。导数的定义公式为：

$$
\frac{\partial}{\partial \theta} J(\theta) = \frac{J(\theta+\varepsilon) - J(\theta-\varepsilon)}{2\varepsilon}
$$

对于 $\theta = [\theta_1, \theta_2, \ldots, \theta_n]$，你需要计算每个 $\theta_n$的偏导数：

$$
\begin{aligned}
\frac{\partial}{\partial \theta_1} J(\theta) &=& \frac{J(\theta_1+\varepsilon, \theta_2, \ldots, \theta_n) - J(\theta_1-\varepsilon, \theta_2, \ldots, \theta_n)}{2\varepsilon} \\ 
\frac{\partial}{\partial \theta_2} J(\theta) &=& \frac{J(\theta_1, \theta_2+\varepsilon, \ldots, \theta_n) - J(\theta_1, \theta_2-\varepsilon, \ldots, \theta_n)}{2\varepsilon} \\ 
\vdots \\ 
\frac{\partial}{\partial \theta_n} J(\theta) &=& \frac{J(\theta_1, \theta_2, \ldots, \theta_n+\varepsilon) - J(\theta_1, \theta_2, \ldots, \theta_n-\varepsilon)}{2\varepsilon}
\end{aligned}
$$

之后将其与由反向传播计算出的偏导数相比较，两者应非常接近。这个方法叫做 **梯度检测(Gradient checking)**

在神经网络中，我们要优化的参数 $\Theta^{(l)}$ 是不能全部初始化为0的。原因在于如果初始权值全部为0，则隐含层的所有节点的激活值 $a^{(l)}_i$ 将全部相等，在进行反向传播时将同步更新，不会出现差异，此时隐含层的节点数量虽然有多个，但是并没有起到相应的作用，相当于浪费了。因此，在初始化权值矩阵时，需要对每个单一的权值 $\Theta^{(l)}_{ij}$进行 **随机赋值(Random initialization)** ，使得每个权值都不会相同，避免有同一层多个节点同步更新的问题(Symmetry breaking)。

具体的方法，是将每个 $\Theta^{(l)}_{ij}$ 随机赋值到 $[-\varepsilon, \varepsilon]$ 区间内，在Matlab中实现如下：

```
Theta1 = rand(row1, col1)*(2*INIT_EPSILON) - INIT_EPSILON
Theta2 = rand(row2, col2)*(2*INIT_EPSILON) - INIT_EPSILON
```

总结一下，实现一个神经网络的步骤是：

1. 随机初始化权值矩阵 $\Theta$
2. 实现前向传播来计算假设函数 $h_\Theta(x)$
3. 实现函数计算代价函数 $J(\Theta)$
4. 实现反向传播来计算偏导数 $\frac{\partial}{\partial \Theta^{(l)}_{ij}} J(\Theta)$
5. 使用梯度检测方法验证自己实现的反向传播算法是否正确
6. 使用梯度下降等算法最小化代价函数 $J(\Theta)$ 的值(即训练 $\Theta$)
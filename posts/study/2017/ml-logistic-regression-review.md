---
title: "机器学习-逻辑回归学习总结"
date: 2017-04-26T16:55:49+08:00
author: dyzdyz010
tags:
  - ml
  - review
collection: study
---

终于把Coursera上Andrew的机器学习课第三周完成了😌

第三周主要讲了 **逻辑回归(Logistic Regression)** 的概念和实现方法。

在课程中，Andrew讲到逻辑回归主要是为了解决 **分类问题(Classification)** ，即最终我们需要得到的结果是几个离散的值，例如*是/不是*的二分类问题，就可以看作是对其取值——
  + **是：** $y=1$
  + **不是：** $y=0$

在这种情境下，区别于上一章的 **线性回归(Linear Regression)** ，这里的 **假设函数(Hypothesis)** 采用 **Sigmoid** 函数，意在表示某一样本属于其中一个分类的概率：

$$P(y=1|x;\theta) = h_\theta(x) = g(\theta^Tx)$$

$$g(z) = \frac{1}{1+e^{-z}}$$

$g(z)$的函数图像如下：
![Sigmoid函数图像](@blogimg/2017/04/006tNc79ly1fezs1eute2j30hk0bo3z6.jpg)

可以看出，这个函数的取值范围是$[0, 1]$，正好符合概率的定义，即**一个事件发生的概率最大为1（绝对发生），最小为0（绝不发生）**。而在分类中，一个样本总是属于一个类别（$y=1 || y=0$)，不存在中间值，因此我们规定：

$$
y=\begin {cases} 
1, & h_\theta(x) \geq 0.5 \\ 
0, & h_\theta(x) < 0.5 
\end {cases} 
$$

由上图可知，当$h_\theta(x) \geq 0.5$时，$z \geq 0$，即$\theta^Tx \geq 0$。

为了满足这个条件(即$\theta^Tx \geq 0$)，引入 **决策边界(Decision Boundary)** 的概念。以课程中的例子为例：

![](@blogimg/2017/05/006tNc79ly1fezv6qgjh4j30ik0fw0uz.jpg)

在有两个特征($x_1, x_2$)的情况下，令$z = \theta_0 + \theta_1x_1 + \theta_2x_2 = 0$，可以在上图中得到一条直线(决策边界)，将分别取属于两个类别的样本划分开来。

在这个例子中，根据上面的公式，我们可以规定：

::: tip
当 $\theta_0 + \theta_1x_1 + \theta_2x_2 \geq 0$ 时，我们预测 $y = 1$ ；当 $\theta_0 + \theta_1x_1 + \theta_2x_2 < 0$ 时，我们预测 $y = 0$
:::

逻辑回归的 **目的** 就是通过调整$\theta$，使得这条直线能够以最小的误差将两种样本分开，从而对新的样本进行预测。

为了得到满足要求的 $\theta$ ，引入 **代价函数(Cost Function)** 的概念，记作 $J(\theta)$ 。

与之前的线性回归中的代价函数不同，如果直接拿来用的话，会导致 $J(\theta)$ 为非凸函数，不能保证其收敛到全局最优解：

![](@blogimg/2017/04/006tNc79ly1fezvqbwo05j30oq0fswfl.jpg)

因此为了保证代价函数 $J(\theta)$ 能够经过迭代取得全局最小值，我们将逻辑回归的 $J(\theta)$ 定义为如下形式： *(其中 $m$ 为样本数，下同)*

$$
J(\theta) = \frac{1}{m}\sum_{i=1}^m Cost(h_\theta(x), y)
$$

$$
Cost(h_\theta(x), y) = \begin {cases} 
-log(h_\theta(x)), & y = 1 \\ 
-log(1 - h_\theta(x)), & y = 0 
\end {cases} 
$$

当$y = 0$时，$Cost(h_\theta(x), y)$的函数图像形状如下图：

![](@blogimg/2017/04/006tNc79ly1fezwnnpeuuj30nk0keta5.jpg)

可以看到，当$h_\theta(x) = 0$时，代价函数$J(\theta)$的值也为0，意味着没有代价，完全符合；同样当$h_\theta(x) = 1$时，代价函数$J(\theta) = \infty$，意味着此时预测函数取得了与实际结果完全相反的值，因此代价无限大。当$y = 1$时也是同理。

为了使得最终的假设函数$h_\theta(x)$能够合理地预测之后的样本结果，我们需要不断迭代$\theta$，使得代价函数$J(\theta)$取得一个合理的最小值。为了使这一过程称为可能，我们将上面的分段函数合并为以下形式：

$$
Cost(h_\theta(x), y) = -y \cdot log(h_\theta(x)) - (1 - y)log(1 - h_\theta(x))
$$

$$
J(\theta) = -\frac{1}{m}[\sum_{i=1}^m y^{(i)}log(h_\theta(x^{(i)})) + (1 - y^{(i)})log(1 - h_\theta(x^{(i)}))]
$$

我们的目标是取得$\min J(\theta)$时$\theta$的值，并将其代入假设函数$h_\theta(x)$中，这样当我们拿到一个新的样本$x$时，我们可以使用下面的公式得出预测结果：

$$
h_\theta(x) = \frac{1}{1 + e^{-\theta^Tx}}
$$

要想取得$\min_\theta J(\theta)$，我们继续采用之前学过的梯度下降方法：*($j$代表样本中的特征序号，下同)*

$$
\theta_j = \theta_j - \alpha\frac{\partial}{\partial \theta_j} J(\theta)
$$

其中，$\theta_j$必须 **同步更新** ，即在一次迭代中计算出所有$\theta_j$的值，并将其作为下次迭代的初始值，而不是先将一个特征的$\theta_j$迭代至最优，再对下一个特征的$\theta_j$进行迭代。

经过求偏导后，得到的梯度下降公式为：

$$
\theta_j = \theta_j - \alpha\sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)})x_j^{(i)}
$$

在`Matlab`和`Octave`中，我们可以不手动实现梯度下降算法，软件中内置了迭代函数`fminunc`可以帮我们自动进行迭代计算，而我们只需要提供下面两个式子的值：

- $J(\theta)$
- $\frac{\partial}{\partial \theta_j} J(\theta)$ $j = 0, 1, ..., n$

`fminunc`函数的调用形式如下：

```octave
[theta, cost] = fminunc(@(t)(costFunction(t, X, y)), initial_theta, options);
```

其中：

- *costFunction*：由我们自己实现的可以计算$J(\theta)$和$\frac{\partial}{\partial \theta_j} J(\theta)$的值的函数
- *initial_theta*：初始的$\theta$向量
- *options*：用于规定`fminunc`函数的迭代方式，具体内容见`help fminunc`
- *theta*：经过迭代后得到的结果$\theta$值
- *cost*：在得到结果$\theta$值时`costFunction`的计算值

至此我们已经可以在数据集上用逻辑回归来实现二分类问题了。

对于需要区分不止两个类别的问题，我们可以将问题 **分解为多个二分类** 来进行实现，即为每一个类别都实现一个假设函数$h_\theta(x)$。套用课程中的例子：

![](@blogimg/2017/04/006tNc79ly1ff0505j5irj30l60i2jsa.jpg)

此时不同的形状代表不同的分类，我们规定：**样本属于`三角形`分类时，$y=1$；样本属于`矩形`分类时，$y=2$；样本属于`叉号`分类时，$y=3$。**。如此假设函数表示为：

$$
h_\theta^{(i)}x = P(y=i | x; \theta)\\ \\ (i = 1, 2, 3)
$$

最终我们需要得出三个假设函数$h_\theta^{(i)}x$，在为其中一个类别实现时，我们将属于另外两个类别的样本统一看作所选分类的补集，从而将问题转化为三个二分类问题。在预测新的样本时我们只要将样本分别代入三个假设函数中，并取计算结果中的最大值，此时所对应的$h_\theta^{(i)}(x)$所对应的$i$就是最终对此样本预测的所属分类。

在最开始的例子中，我们用一条直线就可以将不同类别的样本区分开来：

![](@blogimg/2017/05/006tNc79ly1fezv6qgjh4j30ik0fw0uz.jpg)

但是在其他问题中还存在这样的样本分布：

![](@blogimg/2017/05/006tNc79ly1ff07vikxvbj30si0m6dhz.jpg)

这时候的决策边界是一条不规则曲线，我们需要将决策边界修改为类似以下形式：

$$
z = \theta_0 + \theta_1x_1 + \theta_2x_2 + \theta_3x_1^2 + \theta_4x_2^2
$$

在这里面，特征数量增长为4个($x_1, x_2, x_1^2, x_2^2$)。随着特征数量的增多，决策边界有可能会变成这种样子：

![](@blogimg/2017/04/006tNc79ly1ff0do3wk0kj30sk0mw40s.jpg)

这种情况显然不是我们想要的，所以这种情况被称作**过拟合(Overfitting)**，这种情况的特点在于过于拟合训练数据集，但是对预测新的样本没有帮助甚至有反作用，因此我们要避免这种情况的发生。课程中介绍了一种方法可以有效解决这种情况，叫做**正规化(Regularization)**。正规化的原理在于在代价函数后添加一项，该项为待求$\theta$的倍数，目的在于提高代价函数在某处$\theta$的值，使得最终求得的$\theta$尽可能小，从而避免决策边界变得鬼畜( ´▽｀)。使用正规化方法后的代价函数$J(\theta)$形式为：

$$
J(\theta) = -[\frac{1}{m}\sum_{i=1}^m y^{(i)}log(h_\theta(x^{(i)})) + (1 - y^{(i)})log(1 - h_\theta(x^{(i)}))] + \frac{\lambda}{2m}\sum_{j=1}^n \theta_j^2
$$

**注意：正规化项的求和是从$j=1$开始的，意味着$\theta_0$并不参与正规化。**

在这里，$\lambda$的选取也是有讲究的，既不能过大也不能过小。如果过大，意味着每次迭代$J(\theta)$的值也会很大，最终会导致$\theta$的结果非常小，使得决策边界会过于平坦，不能有效区分类别样本，即**欠拟合(Underfitting)**；如果过小，则不能对代价函数大小产生足够的影响，使得正规化效果不显著。

最终使用正规化方法后的梯度下降算法形式为：

$$
\theta_0 = \theta_0 - \alpha\frac{1}{m}\sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)})x_0^{(i)}
$$

$$
\begin{aligned}
\theta_j &= \theta_j - \alpha[\frac{1}{m}\sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)})x_j^{(i)} + \frac{\lambda}{m} \theta_j] \\ 
&= \theta_j(1 - \alpha\frac{\lambda}{m}) - \alpha\frac{1}{m}\sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)})x_j^{(i)}
\end{aligned}
$$

$$
(j = 1, 2, 3, ..., n)
$$

对以上使用了正规化方法的公式进行求解，可以有效解决逻辑回归中的过拟合问题。

以上です。
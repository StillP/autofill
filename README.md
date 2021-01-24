# autofill
​		autofill是一款可以将导入的文档数据自动填充至网页页面中的浏览器插件。

## 1、文档约定格式

|   元素标识    |  填充内容  |
| :-----------: | :--------: |
| 元素的name/id | 需填充内容 |

​		元素标识同填充内容之间用空格隔开，不同元素之间用换行作为分割符。当填充元素为多选框，填充内容有多项时，不同选项用英文逗号隔开。

## 2、字段约定说明

### 2.1、元素标识

​		元素标识应为元素的id或name属性，按先id后name的原则进行寻找。如果按id已经找到dom则不再进行按name进行寻找。普通文本框（type为text的input元素）及下拉框（select）均可以使用id或者name进行查找。由于采用了先id后name的原则，故而建议优先使用id。单选按钮（type为radio的input元素）和多选框（type为checkbox的input元素）由于使用id很难定位到所有选型，故只能使用name属性值进行定位

### 2.2、填充内容

## 3、设计思路

​		按id应只能找到两种类型的dom：一类是type为text的input元素，另一类是select元素。如果是前者，则直接将该元素的value值赋值为填充内容；如果是后者则获取select元素的子节点，并判断子节点中是否有option节点并判断该节点的innerText值是否与填充内容一致，如果满足条件，则将该option元素的checked属性值设置成true，如果不满足则返回填充内容不匹配。

​		按name值寻找应该可以定位到所有类型的元素。
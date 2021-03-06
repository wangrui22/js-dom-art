//书写 
// perl风格 \\ 常用
// JS 风格 new RegExp 少用
//字符串api
// str.search 找到索引
// str.match 找到并抽取出来
// str.replace 替换 可用来做敏感词过滤

//正则api
// reg.test 满足正则返回true,一部分符合要求就返回true,校验全部要加行首行尾 ^ $


//规则如下：

// i 忽略大小写
// g 找到全部符合需求的

// | 或的意思，组合一组条件
// [] 原子符 1 [abc]pc => apc bpc cpc都符合要求
// 2 [1-9] 表范围 
// ^ 方括号里表示排除 [^1-9a-zA-Z]除了字母和数字都符合要求
// ^方括号外表示行首
// $方括号外表示行尾

//转移字符：
// \d [0-9]匹配数字
// \D [^0-9]
// . 任意字符,尽量不要用
// \w 英文，数字和下划线 [a-z0-9_]
// \W[^a-z0-9_]
// \s 空白字符（空格，tab等不可显示和打印的）
// \S 

//常用量词 
// {n} 正好出现n次 如电话号码 /[1-9]\d{7}/g
// {n,m} 最少n次，最多m次 如QQ号 /[1-9]/d{4,10}
// {n,} 最少n次，做多不限 {1,} 和 +一样
// + 表示若干（多少都可以）
// ? {0,1} 可有可无 如固定电话 010-12341234 == 12341234 区号可有可无 /(0\d{2,3}-)?[1~9]/d{7}/
// * {0,} 可有可无 ，没出现也可以，尽量别用


//实例

//字符串操作
let reg=/\d+/g;
let str='adsf 23 45 dsadn8990';
console.log(str.match(reg));
console.log(str.replace(reg, 'a'));
console.log(str.match(/[2-5]/g));

// 邮箱校验
// 英文数字下划线@数字英文.英文 /[1-9a-zA-Z_]@[1-9a-zA-Z].[a-zA-Z]/d
let regEmail = /^\w+@[1-9a-zA-Z]+\.[a-z]+$/i;
let email ='worry_wang@163.com';
console.log(regEmail.test(email));

//正则的特性：贪婪，尽可能匹配较长的字符串，一定要注意头尾
//实例 偷小说（采集器） 过滤HTML标签 <除了<>以外的字符>  replace(/<[^<>]+>/g,'')

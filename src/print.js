console.log('这个模块被加载了!');

export default function printMe() {
  console.log('hxwnb!');
  // 配合 source map 可以在控制台看到具体的错误文件
  // console.error('I get called from print.js!');
}
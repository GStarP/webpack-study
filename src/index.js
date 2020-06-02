import { cube } from './math.js';
import './style.css';
// import Icon from './icon.jpg';
// import PrintMe from './print.js';

function component() {
  let element = document.createElement('div');
  element.innerHTML = [
    '5 cubed is equal to ' + cube(5)
  ];
  element.classList.add('hello');
  // 测试 loader 加载图片
  // let icon = new Image();
  // icon.src = Icon;
  // element.appendChild(icon);
  let btn = document.createElement('button');
  btn.innerHTML = 'Click';
  // btn.onclick = PrintMe;
  let br = document.createElement('br');
  btn.onclick = (e) => {
    import(/* webpackChunkName: "print" */ './print').then((module) => {
      let print = module.default;
      print();
    })
  };
  element.appendChild(btn);
  element.appendChild(br);
  return element;
}

let e = component();
document.body.appendChild(e);

if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('模块热更新!');
    document.body.removeChild(e);
    e = component();
    document.body.appendChild(e);
  })
}
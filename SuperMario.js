const startBtn = document.querySelector("#startBtn");
const count = document.querySelector(".count");
const show = document.querySelector(".show");
const clear = document.querySelector(".clear");
const lastImg = document.querySelector(".lastImg");
const lifeCount = document.querySelector(".lifeCount");
const lifeNumber = lifeCount.querySelector("#lifeNumber");
const audioBtn = document.querySelector("#audio");
const canvas = document.querySelector('#test');
const ctx = canvas.getContext('2d');


let keyDown = {};
let objectList = [];
let stage = 0;
let 점프timer = 0;
let 점프중 = false;
// let isPotal = false;
let 마리오커짐 = false; // true 면 커짐
let isOver = false;
let isGreen = false; // true면 루이지로 바뀜
let eatStarCount = 0;
let lastStage = false;

const 시작화면 = new Image();
시작화면.src = './img/시작화면.PNG';

const 메인화면 = new Image();
메인화면.src = './img/메인화면.jpg';

const x3 = new Image();
x3.src = './img/x3.png';
const x2 = new Image();
x2.src = './img/x2.png';
const x1 = new Image();
x1.src = './img/x1.png';

const image = new Image();
image.src = './img/쪼렙마리오.png';

const bigMario = new Image();
bigMario.src = './img/슈퍼마리오2.png';

const greenMario = new Image();
greenMario.src = './img/루이지.png';

const 벽돌 = new Image();
벽돌.src = './img/벽돌.png';

const 파이프 = new Image();
파이프.src = './img/파이프.png';

const 피라냐식물 = new Image();
피라냐식물.src = './img/피라냐식물.png';

const 아이템벽돌 = new Image();
아이템벽돌.src = './img/아이템벽돌.png';

const 배경 = new Image();
배경.src = './img/마리오배경.jpg';

const 배경3 = new Image();
배경3.src = './img/바다배경.jpg';

let backX = 0;

const 아이템버섯 = new Image();
아이템버섯.src = './img/아이템버섯.png';

const 초록버섯 = new Image();
초록버섯.src = './img/초록버섯.png';

const oneUp = new Image();
oneUp.src = './img/목숨1up.png';

const 굼바 = new Image();
굼바.src = './img/굼바.png';

const 플라잉굼바 = new Image();
플라잉굼바.src = './img/플라잉굼바.png';

const 별 = new Image();
별.src = './img/별.png';

const 문 = new Image();
문.src = './img/문.png';

const 자물쇠 = new Image();
자물쇠.src = './img/자물쇠.png';

const 숫자1 = new Image();
숫자1.src = './img/숫자1.png';

const 숫자2 = new Image();
숫자2.src = './img/숫자2.png';

const 숫자3 = new Image();
숫자3.src = './img/숫자3.png';

const 매그넘 = new Image();
매그넘.src = './img/매그넘2.png';

const 해골몬스터 = new Image();
해골몬스터.src = './img/해골몬스터.png';

const 뿔버섯 = new Image();
뿔버섯.src = './img/뿔버섯.png';

const 버튼꽃 = new Image();
버튼꽃.src = './img/버튼꽃.png';

const 공주 = new Image();
공주.src = './img/공주2.png'

const 마지막마리오 = new Image();
마지막마리오.src = './img/인사하는마리오.png';

const 엔딩 = new Image();
엔딩.src = './img/엔딩.png';

addEventListener('keydown', (e) => {
  keyDown[e.keyCode] = true;
})

addEventListener('keyup', (e) => {
  keyDown[e.keyCode] = false;
})

class Player {
  constructor() {
    this.size = 50;
    this.x = 0;
    this.y = canvas.height - this.size;
    this.speed = 5;
    this.color = 'red';
    this.life;
  }

  movePlayer() {
    let px = this.x;
    let py = this.y;
    let isPotal = false;

    if (keyDown[37]) {
      this.x -= this.speed;
      // isPotal = false; 
    }
    if (keyDown[39]) {
      this.x += this.speed;
      // isPotal = false; 

    }
    if (keyDown[38]) {
      this.y -= this.speed;
      // isPotal = false; 
    }
    if (keyDown[40]) { // 아래로 이동
      this.y += this.speed;
      isPotal = true;
    }
    if (keyDown[32]) {
      // 스페이스바 눌렀을 때
      점프중 = true;
    }

    // document.addEventListener("keydown", e => {
    //   if (e.keycode === 'Space') {
    //     점프중 = true;
    //   }
    // })
    if (점프중 == true) {
      this.y -= 2;
      점프timer++;
    }
    let onBlock = false;
    let blockY;
    let isTrap = false;
    let goNext = false;

    if (점프중 == false) {
      if (this.y < canvas.height - this.size) {
        // this.y += 2;
        objectList.forEach((obj) => {
          if (this.inBottom(obj, this.x, this.y)) {
            if (obj.name === '파이프' && obj.id === '함정') {
              isTrap = true;
            } else if (obj.name === '파이프') {
              if (eatStarCount === 4) {
                goNext = true;
              } else {
                show.style.visibility = 'visible';
                setTimeout(() => {
                  show.style.visibility = 'hidden';
                }, 1000);
                this.x = 0;
              }
              // stage += 1;
            }
            if (obj.name === '벽돌' || obj.name === '아이템벽돌') {
              onBlock = true;
              blockY = obj.y;
            }
          }
        })
        if (onBlock) {
          this.y = blockY;
        } else {
          this.y += 2;
        }
      }
    }
    if (점프timer > 70) {
      점프중 = false;
      점프timer = 0;
    }
    let maxX = canvas.width - this.size;
    let maxY = canvas.height - this.size;
    if (this.x <= 0) this.x = 0;
    if (this.x >= maxX) this.x = maxX;
    if (this.y <= 0) this.y = 0;
    if (this.y >= maxY) this.y = maxY;

    let isCrash = false;
    let isItemBlock = false;
    let killGumba = false;
    let isEatItem = false;
    let breakBlock = false;
    let findId;
    let eatStar = [];
    let pressBtn = false;

    objectList.filter((obj) => {
      if (obj.name === '파이프') {
        if (this.isPipe(obj)) {
          this.x = px;
        }
      }
    })

    objectList.forEach((obj) => {
      if (this.collision(obj)) {
        // if (obj.name === '공주') {
        //   lastImg.style.visibility = 'visible';
        //   let num = 1;
        //   setInterval(() => {
        //     lastImg.style.opacity = `${num -= 0.05}`;
        //   }, 100);
        // }
        if (obj.name === '매그넘' || obj.name === '해골몬스터') {
          if (마리오커짐) {
            마리오커짐 = false;
            this.size = 50;
          } else {
            this.life -= 1;
            isOver = true;
          }
          this.x = 0;
          // this.y = canvas.height - this.size;
          this.y = canvas.height - 100;
        }
        if (obj.name === '문') {
          if (obj.id === '스테이지1') {
            openNewStage1();
            stage += 1;
          }
        }
        if (obj.name === '별') {
          // console.log(obj.id);
          eatStar.push(obj.id);
          console.log(eatStar);
          eatStarCount += 1;
          count.innerHTML = `${eatStarCount} / 4`;
          console.log(eatStarCount);
        }
        if (obj.name === "아이템버섯") {
          isEatItem = true;
        } else if (obj.name === '초록버섯') {
          isEatItem = true;
          isGreen = true;
        }
        if (obj.name === '버튼꽃') {
          pressBtn = true;
        }
        return false;
      }
    })

    if (pressBtn) {
      objectList = objectList.filter(obj => obj.name !== "버튼꽃");
      setTimeout(() => {
        objectList = objectList.filter(obj => obj.id !== '막힌벽돌');
      }, 200);
    }

    if (eatStar.length !== 0) {
      objectList = objectList.filter(obj => eatStar[0] !== obj.id)
    }

    objectList.forEach((obj) => {
      if (obj.name === '굼바' || obj.name === '플라잉굼바' || obj.name === '매그넘' ||
        obj.name === '해골몬스터' || obj.name === '뿔버섯') {
        if (this.isGumba(obj)) {
          // isOver = true;
          if (마리오커짐) {
            마리오커짐 = false;
            isGreen = false;
            this.size = 50;
          } else {
            this.life -= 1;
            isOver = true;
          }
          this.x = 0;
          // this.y = canvas.height - this.size;
          this.y = canvas.height - 100;

        }
      }
    })
    objectList.forEach((enemy) => {
      if (enemy.name === '벽돌' || enemy.name === '아이템벽돌') {
        if (this.heading(enemy, this.x, this.y) && !마리오커짐) {
          isCrash = true;
          if (enemy.name == '아이템벽돌') {
            isItemBlock = true;
          }
        } else if (this.heading(enemy, this.x, this.y) && 마리오커짐) {
          breakBlock = true;
          findId = enemy.id;
        }
      }
    })

    if (breakBlock) {
      objectList = objectList.filter(obj => obj.id !== findId);
    }

    if (isEatItem) {
      마리오커짐 = true;
      this.size += 50;
      objectList = objectList.filter(obj => obj.name !== "아이템버섯");
      objectList = objectList.filter(obj => obj.name !== "초록버섯");
      objectList.push(new Object('oneUp', 5, this.x + 50, this.y - 60, 100, 100));
      setTimeout(() => {
        objectList = objectList.filter(obj => obj.name !== "oneUp");
      }, 1000);
    }
    if (isOver) {
      lifeNumber.innerHTML = ` X ${this.life}`;
      clearInterval(monsterInterval);
      clearInterval(playGame);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'black';
      ctx.fill();
      if (this.life == 0) {
        count.style.visibility = 'hidden';
        eatStarCount = 0;
        stage = 0;
        ctx.drawImage(시작화면, 0, 0, canvas.width, canvas.height);
        startBtn.style.visibility = "visible";
        startBtn.innerHTML = "Game Over";
        setTimeout(() => {
          startBtn.innerHTML = "Start Game";
        }, 1000);
      } else {
        if (this.life == 2) {
          ctx.drawImage(x2, canvas.width / 2 - 50, canvas.height / 2 - 40, 100, 80);
        } else if (this.life == 1) {
          ctx.drawImage(x1, canvas.width / 2 - this.size, canvas.height / 2 - this.size, 100, 80);
        }
        setTimeout(() => {
          isOver = false;
          monsterInterval = setInterval(monsterMove, 10);
          playGame = setInterval(draw, 10);
        }, 3000);
      }
    }
    if (isTrap) {
      objectList.filter((obj) => {
        if (obj.id === '함정') {
          objectList.push(new Object('피라냐식물', 5, obj.x, obj.y - 100, 100, 100));
        }
      });
      setTimeout(() => {
        objectList = objectList.filter(obj => obj.name !== "피라냐식물");
      }, 300);
      this.x = 0;
      this.y = canvas.height - this.size;
    }
    if (isCrash) {
      this.x = px;
      // this.y = py;
      this.y = canvas.height - this.size;
    }

    if (lastStage) {
      player.x += 2;
      objectList.filter((obj) => {
        if (obj.name === '공주') {
          if (player.x + player.size >= obj.x) {
            showLastScreen();
          }
        }
      })
    }

    // 아이템 버섯이 나오는 벽돌의 x , y값 구하기
    let itemBlockX;
    let itemBlockY;
    objectList.filter((obj) => {
      if (obj.name === '아이템벽돌') {
        itemBlockX = obj.x;
        itemBlockY = obj.y;
      }
    })

    if (isItemBlock) {
      let rNum = Math.floor(Math.random() * 2);
      setTimeout(() => {
        objectList = objectList.filter(obj => obj.name !== "아이템벽돌");
        if (rNum == 0) {
          objectList.push(new Object('아이템버섯', 0, itemBlockX, itemBlockY, 35, 35));
        } else {
          objectList.push(new Object('초록버섯', 0, itemBlockX, itemBlockY, 35, 35));
        }
      }, 500);
    }
    if (goNext) {
      stage += 1;
      clear.style.visibility = 'visible';
      setTimeout(() => {
        clear.style.visibility = 'hidden';
      }, 500);
      if (stage === 2) openNewStage2();
      else if (stage === 3) openNewStage3();
      // openMainStage();
      eatStarCount = 0;
    }
  }


  inRect(obj, px, py) {
    if (obj.x < px && px < obj.x + obj.width && obj.y < py && py < obj.y + obj.height) {
      return true;
    } else {
      false;
    }
  }

  isPipe(obj) {
    if (player.x < obj.x + obj.width && player.x + player.size > obj.x &&
      player.y === obj.y) {
      return true;
    }
    if (player.x < obj.x + obj.width && player.x + player.size > obj.x &&
      player.y + player.size > obj.y) {
      return true;
    }
  }

  isGumba(enemy) {
    if (enemy.name === '굼바' || enemy.name === '뿔버섯') {
      if (player.x < enemy.x + enemy.width && player.x + player.size > enemy.x &&
        player.y === enemy.y) {
        return true;
      }
      if (player.x < enemy.x + enemy.width && player.x + player.size > enemy.x &&
        player.y + player.size > enemy.y) {
        return true;
      }
    }
    // if (enemy.name === '매그넘'){

    // }
    if (enemy.name === '플라잉굼바') {
      if (player.x < enemy.x + enemy.width && player.x + player.size > enemy.x &&
        enemy.y - enemy.height < player.y && player.y < enemy.y) {
        return true;
      }
    }
  }

  밟았을때
  inBottom(obj, px, py) {
    if ((obj.x - obj.width / 2 < px && px < obj.x + obj.width) &&
      (obj.y <= py && py < obj.y + 10)) {
      return true;
    }
    return false;
  }

  // 머리 부딪혔을때
  heading(obj, px, py) {
    if ((obj.x - obj.width / 2 < px && px < obj.x + obj.width) &&
      (obj.y + obj.height - 25 < py && py <= obj.y + obj.width)) {
      return true;
    } else {
      return false;
    }
  }

  collision(obj) {

    // player의 왼쪽 상단 모서리가 닿으면
    if (this.inRect(obj, this.x, this.y)) {
      return true;
    }
    // player의 오른쪽 상단 모서리가 닿으면
    else if (this.inRect(obj, this.x + this.size, this.y)) {
      return true;
    }
    // player의 왼쪽 하단 모서리가 닿으면
    else if (this.inRect(obj, this.x, this.y + this.size)) {
      // isPotal = true;
      return true;
    }
    // player의 오른쪽 하단 모서리가 닿으면
    else if (this.inRect(obj, this.x + this.size, this.y + this.size)) {
      return true;
    } else return false;
  }

  render(ctx) {
    this.movePlayer();
    if (!isOver && !lastStage) {
      if (!마리오커짐) {
        ctx.drawImage(image, this.x, this.y, this.size, this.size);
      } else if (마리오커짐 && isGreen) {
        ctx.drawImage(greenMario, this.x, this.y, this.size, this.size);
      } else if (마리오커짐 && !isGreen) {
        ctx.drawImage(bigMario, this.x, this.y, this.size, this.size);
      }
    } else if (!isOver && lastStage) {
      this.size = 220;
      ctx.drawImage(마지막마리오, this.x, this.y, this.size, this.size);
    }
  }
}

class Object {
  constructor(name, id, x, y, width, height, color) {
    this.name = name;
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  render(ctx) { // 파이프용
    ctx.drawImage(파이프, this.x, this.y, this.width, this.height);
  }

  renderBlock(ctx) { // 벽돌용
    ctx.drawImage(벽돌, this.x, this.y, this.width, this.height);
  }

  renderItemBlock(ctx) {
    ctx.drawImage(아이템벽돌, this.x, this.y, this.width, this.height);
  }

  renderItemMushroom(ctx) {
    ctx.drawImage(아이템버섯, this.x, this.y, this.width, this.height);
  }

  renderGreenMushroom(ctx) {
    ctx.drawImage(초록버섯, this.x, this.y, this.width, this.height);
  }

  renderTrapPipe(ctx) {
    ctx.drawImage(피라냐식물, this.x, this.y, this.width, this.height);
  }

  renderGumBa(ctx) {
    ctx.drawImage(굼바, this.x, this.y, this.width, this.height);
  }
  renderFlyingGumBa(ctx) {
    ctx.drawImage(플라잉굼바, this.x, this.y, this.width, this.height);
  }
  renderOneUp(ctx) {
    ctx.drawImage(oneUp, this.x, this.y, this.width, this.height);
  }

  renderDoor(ctx) {
    ctx.drawImage(문, this.x, this.y, this.width, this.height);
  }

  renderRock(ctx) {
    ctx.drawImage(자물쇠, this.x, this.y, this.width, this.height);
  }

  renderNumberOne(ctx) {
    ctx.drawImage(숫자1, this.x, this.y, this.width, this.height);
  }
  renderNumberTwo(ctx) {
    ctx.drawImage(숫자2, this.x, this.y, this.width, this.height);
  }
  renderNumberThree(ctx) {
    ctx.drawImage(숫자3, this.x, this.y, this.width, this.height);
  }

  renderSun(ctx) {
    ctx.drawImage(별, this.x, this.y, this.width, this.height);
  }

  renderMagnum(ctx) {
    ctx.drawImage(매그넘, this.x, this.y, this.width, this.height);
  }

  renderSkeleton(ctx) {
    ctx.drawImage(해골몬스터, this.x, this.y, this.width, this.height);
  }

  renderBtnFlower(ctx) {
    ctx.drawImage(버튼꽃, this.x, this.y, this.width, this.height);
  }

  renderPrincess(ctx) {
    ctx.drawImage(공주, this.x, this.y, this.width, this.height);
  }

  renderHornMushroom(ctx) {
    ctx.drawImage(뿔버섯, this.x, this.y, this.width, this.height);
  }
}

let player = new Player();

function add() {
  objectList.push(new Object('벽돌', 111, 100, 400, 50, 50));
  objectList.push(new Object('벽돌', 112, 145, 400, 50, 50));
  objectList.push(new Object('벽돌', 113, 745, 250, 50, 50));
  objectList.push(new Object('벽돌', 114, 790, 250, 50, 50));
  objectList.push(new Object('아이템벽돌', '아이템벽돌', 835, 250, 50, 50));
  objectList.push(new Object('굼바', 6, 200, canvas.height - 30, 30, 30));
  objectList.push(new Object('플라잉굼바', 7, 100, 200, 40, 40));
  objectList.push(new Object('파이프', '함정', canvas.width - 700, 400, 100, 200));
  objectList.push(new Object('파이프', 0, canvas.width - 100, 400, 100, 200));

  objectList.push(new Object('별', '별1', 100, 100, 50, 50));
  objectList.push(new Object('별', '별2', 400, 438, 50, 50));
  objectList.push(new Object('별', '별3', 730, 70, 50, 50));
  objectList.push(new Object('별', '별4', 983, 500, 50, 50));

  console.log(objectList);
  objectList.forEach((e) => {
    console.log(e.x);
  })

}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (stage == 0) {
    ctx.drawImage(메인화면, 0, 0, canvas.width, canvas.height);
  } else if (stage == 1) {
    backX += 1;
    ctx.drawImage(배경, backX, 0, canvas.width, canvas.height);
    ctx.drawImage(배경, backX - canvas.width, 0, canvas.width, canvas.height);
  } else if (stage == 2) {
    backX += 1;
    ctx.drawImage(메인화면, backX, 0, canvas.width, canvas.height);
    ctx.drawImage(메인화면, backX - canvas.width, 0, canvas.width, canvas.height);
  } else if (stage == 3) {
    ctx.drawImage(배경3, 0, 0, canvas.width, canvas.height);
  }
  if (backX == canvas.width) {
    backX = 0;
  }
  objectList.forEach((e) => {
    if (e.name == '벽돌') {
      e.renderBlock(ctx);
    } else if (e.name == '아이템벽돌') {
      e.renderItemBlock(ctx);
    } else if (e.name == '아이템버섯') {
      e.renderItemMushroom(ctx);
    } else if (e.name == '초록버섯') {
      e.renderGreenMushroom(ctx);
    } else if (e.name == '피라냐식물') {
      e.renderTrapPipe(ctx);
    } else if (e.name == '굼바') {
      e.renderGumBa(ctx);
    } else if (e.name == '플라잉굼바') {
      e.renderFlyingGumBa(ctx);
    } else if (e.name == '파이프') {
      e.render(ctx)
    } else if (e.name == 'oneUp') {
      e.renderOneUp(ctx);
    } else if (e.name === '문') {
      e.renderDoor(ctx);
    } else if (e.name === '자물쇠') {
      e.renderRock(ctx);
    } else if (e.name === '숫자1') {
      e.renderNumberOne(ctx);
    } else if (e.name === '숫자2') {
      e.renderNumberTwo(ctx);
    } else if (e.name === '숫자3') {
      e.renderNumberThree(ctx);
    } else if (e.name === '별') {
      e.renderSun(ctx);
    } else if (e.name === '매그넘') {
      e.renderMagnum(ctx);
    } else if (e.name === '해골몬스터') {
      e.renderSkeleton(ctx);
    } else if (e.name === '버튼꽃') {
      e.renderBtnFlower(ctx);
    } else if (e.name === '공주') {
      e.renderPrincess(ctx);
    } else if (e.name === '뿔버섯') {
      e.renderHornMushroom(ctx);
    }
  })
  player.render(ctx);
}

let back = false;
let flyingBack = false;
let itemBack = false;
let flyingSkeleton = false;

function monsterMove() {
  // objectList.push(new Object('굼바', 6, 0, canvas.height - 50, 100, 100));
  // ctx.drawImage(굼바, this.x, this.y, this.width, this.height);

  objectList.filter((obj) => {
    if (obj.name === "굼바" || obj.name === "뿔버섯") {
      if (!back) {
        obj.x += 2;
      } else {
        obj.x -= 2;
      }
      if (obj.x == canvas.width - obj.width) {
        back = true;
      }
      if (obj.x == obj.width) {
        back = false;
      }
    } else if (obj.name === '플라잉굼바') {
      if (!flyingBack) {
        obj.x += 1.5;
      } else {
        obj.x -= 1.5;
      }

      // 위 아래로 날아다니는 굼바 구현
      setTimeout(() => {
        obj.y -= 0.5;
      }, 70);

      if (obj.y < 195) {
        setTimeout(() => {
          obj.y += 3;
        }, 60);
      }

      if (obj.x >= canvas.width - obj.width) {
        flyingBack = true;
      }
      if (obj.x == obj.width) {
        flyingBack = false;
      }
    } else if (obj.name === "아이템버섯" || obj.name === '초록버섯') {
      setTimeout(() => {
        obj.y += 5;
        if (obj.y >= canvas.height - obj.height) {
          obj.y = canvas.height - obj.height;
        }
      }, 100);
      // obj.y = canvas.height - obj.height;
      if (!itemBack) {
        obj.x += 2;
      } else {
        obj.x -= 2;
      }
      if (obj.x >= 1200 - obj.width) {
        itemBack = true;
      }
      if (obj.x <= obj.width) {
        itemBack = false;
      }
    } else if (obj.name === '매그넘') {
      obj.x -= 7;
      if (obj.x <= 0) {
        obj.x = canvas.width - obj.width;
      }
    } else if (obj.name === '해골몬스터') {
      if (!flyingSkeleton) {
        obj.x += 1.5;
      } else {
        obj.x -= 1.5;
      }

      // 위 아래로 날아다니는 해골 구현
      setTimeout(() => {
        obj.y -= 0.5;
      }, 70);

      if (obj.y < 250) {
        setTimeout(() => {
          obj.y += 5;
        }, 60);
      }

      if (obj.x >= canvas.width - obj.width) {
        flyingSkeleton = true;
      }
      if (obj.x == obj.width) {
        flyingSkeleton = false;
      }
    }
  })
}


function openMainStage() {
  count.style.visibility = 'hidden';
  lifeCount.style.visibility = 'hidden';
  player.x = 0;
  player.y = canvas.height - player.size;
  // ctx.drawImage(메인화면, 0, 0, canvas.width, canvas.height);
  objectList = [];
  // 문 3개 , 자물쇠 2개 만들기.
  // 문에 닿을때 자물쇠가 있으면 못 들어감.
  // 자물쇠 없으면 해당 스테이지로 이동
  objectList.push(new Object('문', '스테이지1', 590, 300, 150, 150));
  objectList.push(new Object('문', '스테이지2', 953, 140, 150, 150));
  objectList.push(new Object('문', '스테이지3', 950, 450, 150, 150));
  objectList.push(new Object('자물쇠', '스테이지2', 1013, 108, 30, 30));
  objectList.push(new Object('자물쇠', '스테이지3', 1010, 420, 30, 30));
  objectList.push(new Object('숫자1', '스테이지1', 630, 280, 20, 20));
  objectList.push(new Object('숫자2', '스테이지2', 990, 115, 20, 20));
  objectList.push(new Object('숫자3', '스테이지3', 980, 423, 30, 30));
}


// add를 이걸로 바꾸기
function openNewStage1() {
  lifeCount.style.visibility = 'visible';
  count.style.visibility = 'visible';
  player.x = 0;
  player.y = canvas.height - player.size;
  objectList = [];
  add();
}

function openNewStage2() {
  count.innerHTML = '0 / 4';
  lifeCount.style.visibility = 'visible';
  count.style.visibility = 'visible';
  player.x = 0;
  player.y = canvas.height - player.size;
  objectList = [];
  objectList.push(new Object('벽돌', 111, 100, 400, 50, 50));
  objectList.push(new Object('벽돌', 112, 145, 400, 50, 50));
  objectList.push(new Object('벽돌', 113, 745, 250, 50, 50));
  objectList.push(new Object('벽돌', 114, 790, 250, 50, 50));
  objectList.push(new Object('아이템벽돌', '아이템벽돌', 835, 250, 50, 50));
  objectList.push(new Object('뿔버섯', 6, 200, canvas.height - 80, 80, 80));
  objectList.push(new Object('플라잉굼바', 7, 100, 200, 40, 40));
  objectList.push(new Object('파이프', '함정', 300, 400, 100, 200));
  objectList.push(new Object('벽돌', '막힌벽돌', 400, 395, 50, 50));
  objectList.push(new Object('벽돌', '막힌벽돌', 443, 395, 50, 50));
  objectList.push(new Object('벽돌', '막힌벽돌', 486, 395, 50, 50));
  objectList.push(new Object('벽돌', '막힌벽돌', 529, 395, 50, 50));
  objectList.push(new Object('파이프', 0, 575, 400, 100, 200));
  objectList.push(new Object('파이프', 0, canvas.width - 100, 400, 100, 200));
  objectList.push(new Object('버튼꽃', 0, canvas.width - 90, 320, 80, 80));

  objectList.push(new Object('별', '별1', 100, 100, 50, 50));
  objectList.push(new Object('별', '별2', 400, 538, 50, 50));
  objectList.push(new Object('별', '별3', 730, 70, 50, 50));
  objectList.push(new Object('별', '별4', 983, 500, 50, 50));
  objectList.push(new Object('매그넘', '매그넘', 1000, 100, 70, 50));
  objectList.push(new Object('해골몬스터', '해골', 1000, canvas.height - 70, 70, 70));

  console.log(objectList);
}

function openNewStage3() {
  count.innerHTML = '0 / 4';
  count.style.visibility = 'hidden';
  lifeCount.style.visibility = 'hidden';
  lastStage = true;
  player.x = 0;
  player.y = canvas.height - player.size;
  objectList = [];
  objectList.push(new Object('공주', 2, canvas.width - 200, canvas.height - 200, 200, 200));
  console.log(objectList);
}

function showLastScreen() {
  clearInterval(playGame);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  objectList = [];
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fill();
  lastImg.style.visibility = 'visible';
  let num = 1;
  setInterval(() => {
    lastImg.style.opacity = `${num -= 0.1}`;
  }, 300);
  setTimeout(() => {
    startBtn.style.visibility = "visible";
  }, 3000);
}

startBtn.addEventListener('click', gameStart);
let monsterInterval = null;
let playGame = null;

let playAudio = false;

function playMusic() {
  var audio = new Audio('./music/SuperMarioSong.mp3');
  audio.load();
  audio.volume = 0.5;
  if (playAudio) {
    audio.play();
  } else {
    audio.pause();
  }
}

window.onload = function () {
  ctx.drawImage(시작화면, 0, 0, canvas.width, canvas.height);
}

function gameStart() {
  player.life = 3;
  lifeNumber.innerHTML = ` X ${player.life}`;
  player.size = 50;
  stage = 0;
  isOver = false;
  lastStage = false;
  startBtn.style.visibility = "hidden";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  objectList = [];
  openMainStage();
  // openNewStage2();
  monsterInterval = setInterval(monsterMove, 10);
  playGame = setInterval(draw, 10);

}

audioBtn.addEventListener('click', () => {
  if (!playAudio) {
    audioBtn.querySelector('#speaker').src = './img/음소거.png';
    playAudio = true;
  } else {
    audioBtn.querySelector('#speaker').src = './img/스피커.png';
    playAudio = false;
  }
  playMusic();
})
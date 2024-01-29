# ***** 슈퍼 마리오 게임 *****

### 1. Game Start 버튼을 누르면 마리오와 문 3개가 나온다.
   - 문 위에는 각 스테이지의 번호가 쓰여 있으며 잠겨진 스테이지들은 자물쇠로 잠겨져있다. (당연히 잠겨져 있으므로 들어갈 수 없음)
   - 스테이지1 문으로 이동하면 본격적으로 게임 시작!

### 2. 벽돌 , 아이템 벽돌 , 마리오 , 몬스터 , 파이프 , 태양 생성하기
 - 플레이어의 목숨은 3개로 시작
 - 원래 몬스터들을 처치할 수 있어야 하지만 , 난이도를 어렵게하기 위하여 몸에 닿는 순간 무조건 목숨 -1 or 크기 줄어들음
 - 벽돌들은 밟을 수 있으며, (크기가 작을 때) 점프하여 머리를 박으면 바로 땅으로 이동한다.
 - 몬스터는 항상 맵의 끝과 끝을 오가며 이동하는 상태 (몬스터는 날아다니기도 하고, 바닥에 기어다니기도 하며 다양하다.)
 - 마리오의 크기가 작은 상태에서 굼바한테 부딪히면 목숨 하나씩 줄어든다. / 마리오의 크기가 커진 상태에서 부딪히면 목숨은 줄어들지 않지만 몸이 다시 작아진다.
 - 마리오의 크기가 작은 상태에서 일반 벽돌들은 부술 수 없으며(아이템 벽돌은 부술 수 있음) 몸이 커진 상태에서는 벽돌을 부술 수 있다.

### 3. 아이템 벽돌을 머리 위로 박아서 부수면 마리오의 크기가 커지는 버섯이 나옴
### ( 50 대 50 확률로 초록 버섯과 빨간 버섯이 나오는데, 초록 버섯을 먹으면 캐릭터가 루이지(초록색)으로 변하며 커지고, 빨간 버섯을 먹으면 커진 마리오로 변한다.
   아이템 버섯을 먹으면 아이템 버섯은 사라지며, 아이템 벽돌은 부숴진다.   
  - 몸집이 커진다는 것은 목숨이 +1과 같음 . 따라서 1up 출력 후 사라지게
 

### 4. 파이프의 위에 올라가서 아래로 들어가야 다음 스테이지로 갈 수 있다.
  - 다음 스테이지로 가기 위한 조건인 별 4개를 먹어야 다음 스테이지로 이동 가능 / 별을 다 채우지 못하면 넘어갈 수 없다.
  - 파이프들 중에는 함정 파이프도 있으니 조심하자! 함정 파이프에 들어가면 시작 지점으로 다시 돌아간다. (이때 목숨은 줄어들지 않음)

### 5. 다음 스테이지에서는 난이도를 더욱 올려 더 다양한 몬스터들이 나오며, 총알도 빠른 속도로 오른쪽에서 왼쪽으로 이동한다.
   - 파이프들 사이에 벽돌로 막혀져 있어서 벽돌 밑의 별을 먹지 못하는데, 꽃을 먹으면 막힌 벽돌들이 사라진다. (꽃은 막힌 벽돌을 없애는 버튼과 같은 역할)
   - 다양한 몬스터들을 피해 별들을 모아 스테이지를 클리어 하자!

### 6. 2스테이지까지 클리어하면 공주를 만나러 마리오가 자동으로 이동한다.
   - 이때 화면에 엔딩장면이 나오고 , 게임 시작 버튼이 다시 나타난다.
  
ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

- 가장 어려웠던 부분은 마리오의 점프를 구현하는 것이다. (아직도 미흡함)
- 스피커 버튼을 누르면 bgm이 나온다.
- 구현하는데 급급하여 아직 클래스와 파일들을 나누지 못하였음. (공부하며 나눌 예정)
- 원래는 더욱 간단하게 만드려고 했지만 아래 블로그 마리오 플래시 게임 리뷰를 참고하여 더 추가하였음.
(해당 게임은 수년 전 게임으로, 현재는 플레이가 불가능)
 https://m.blog.naver.com/island4028/221323918676 


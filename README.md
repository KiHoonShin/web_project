*** 슈퍼 마리오 ***

1. 벽돌 , 아이템 벽돌 , 마리오 , 굼바(몬스터) , 파이프 생성하기
 - 굼바(몬스터)는 항상 맵의 끝과 끝을 오가며 이동하는 상태
 - 마리오의 크기가 작은 상태에서 굼바한테 부딪히면 게임 over / 마리오의 크기가 커진 상태에서 부딪히면 몸이 다시 작아짐
 - 굼바를 발로 밟으면 굼바를 죽일 수 있음 ( 보상으로 코인이 나옴 )
 - 마리오의 크기가 작은 상태에서 일반 벽돌들은 부술 수 없음
<img width="2047" alt="마리오 1단계" src="https://github.com/KiHoonShin/web_project/assets/153797167/7e0148c5-f23f-41e5-92e1-4b2306ae375a">

2. 아이템 벽돌을 머리 위로 박아서 부수면 마리오의 크기가 커지는 버섯이 나옴
    아이템 벽돌은 부숴진다.   
<img width="2047" alt="마리오 2단계" src="https://github.com/KiHoonShin/web_project/assets/153797167/394c11d6-fa5c-4da3-943f-f5dc58218fda">


3. 아이템 버섯을 먹으면 마리오의 크기가 커지며 이미지도 새로운 이미지로 변경한다.
   - 몸집이 커진다는 것은 목숨이 +1과 같음 . 따라서 1up 출력 후 사라지게
 <img width="2047" alt="마리오 3단계" src="https://github.com/KiHoonShin/web_project/assets/153797167/4fee4cd5-28c6-4456-8ccd-a6ad95f08ba2">

4. 파이프의 위에 올라가서 아래로 들어가야 다음 스테이지로 갈 수 있음
<img width="2047" alt="마리오 4단계" src="https://github.com/KiHoonShin/web_project/assets/153797167/daa6efc0-1cfe-4a2e-bd63-e8800c9920c1">

 - 파이프들 중 하나만 다음 스테이지로 가는 진짜 파이프고, 나머지는 아무것도 아닌 파이프이거나 함정으로 피라냐 식물이 나옴

5. 만약 파이프에 들어가려고 했을 때 피라냐 식물이 나온다면 크기가 작아진다. (크기가 작은 상태라면 목숨이 하나 줄어든다.)
   - 다시 시작 위치로 자동으로 이동
<img width="2047" alt="마리오 5단계" src="https://github.com/KiHoonShin/web_project/assets/153797167/651a8b2c-d05e-4224-965f-7492940a96e8">

추가 해야할 것들 - 다음 스테이지 , 랜덤 확률로 보너스 스테이지 , 목숨 개수 , 코인 개수 표시하기 , 오디오 , 배경 입히기

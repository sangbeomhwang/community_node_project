logo color : #121212
logo url : https://i.ibb.co/FHmxMgt/2023-01-30-3-40-39.png

admin 계정
회원가입 페이지에서 admin 계정을 일반 회원으로 계정 생성(생성 시 id 입력 조건이 있어 "admin7722"처럼 영문 숫자 혼합으로 6자리 이상으로 생성해야 함) 후
UPDATE Users SET level = 'top' WHERE userid = 'admin7722';
위의 query 문을 사용하여 관리자 level을 부여함

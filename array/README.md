# Array
## Request
1. 조건 순서에 따라 탑승 인원 출력하기
2. ES6 활용해서 구현해보기 (내 맘대로 리퀘스트)
3. JSDoc 주석 써보기 (내 맘대로 리퀘스트)

## Think
### Array.prototype
- `Array.join([separator = ','])` : 배열의 모든 요소를 연결해 하나의 <u>문자열</u>로 변환
- `Array.slice(startIndex[, endIndex])` : 배열의 특정 부분에 대한 <u>복사본</u>을 생성
- `Array.splice(start, deleteCount[, item...])` : <u>기존의 배열의 내용을 추가 또는 제거</u>하고 그 부분을 새로운 항목으로 대체. 참조된 **원본 배열은 변형되며, 추가/제거 등으로 변형된 배열을 반환**
- `Array.indexOf(element)` : 배열에서 요소를 검색하여 <u>인덱스</u>를 반환. 해당하는 요소가 없는 경우, -1을 반환
- `Array.push(element..)` : 인수로 넘어온 항목을 <u>배열의 끝에 추가</u>. **원본 배열은 변형되고, 변형된 배열의 크기(length)를 반환**
- `Array.concat(element..)` : 인수로 넘어온 항목을 <u>자신의 복사본 뒤에 덧붙인</u> **새로운 배열을 반환**

### Common
- 처음 멤버의 값을 변수로 저장 (`this.members`)
- `sayMembers(answer, index)` : DOM에 각 문제의 답을 출력하는 메소드 생성
- `answer.join(', ')`

### Q1. `hello2020()`
- 제외할 멤버를 배열 변수로 생성 후, 처음 배열의 복사본(`newMembers`)과 비교
- 중복된 멤버를 제거하고 남은 멤버를 최종 멤버로 저장 
- `this.members.slice()`
- `newMembers.splice(this.members.indexOf(cutMembers[i]) - i, 1)`

### Q2. `getFoods()`
- 짝수번째 멤버를 새 배열에 저장하고, 홀수번째 멤버를 최종 멤버로 저장
- `if (0 !== this.members.indexOf(this.members[i]) % 2)`
- `members.push(this.members[i])`

### Q3. `drawLots()`
- 최종 멤버의 인덱스를 랜덤으로 추첨
- 당첨된 멤버를 새 배열에 저장하고, 변형된 배열을 낙오자 배열로 활용
- 당첨자 배열, 낙오자 배열을 객체 내에서 활용 가능하게 저장
- `Math.floor(Math.random() * (max + 1 - i))`
- `winners[i] = stragglers.splice(luckyNumber, 1)[0]`

### Q4. `returnHome()`
- 최종 멤버와 당첨자를 합친 새로운 배열을 반환
- `this.members.concat(this.winners)`

## Reference
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals
- https://poiemaweb.com/es6-class
- https://ko.javascript.info/comments
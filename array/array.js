class UIDev {
    constructor(names) {
        this.members = names;
        this.sayMembers(this.hello2020(), 1);
        this.sayMembers(this.getFoods(), 2);
        this.sayMembers(this.drawLots(), 3);
        this.sayMembers(this.returnHome(), 4);
        this.sayMembers(this.stragglers, 4);
    }

    /** 
     * @param {Array} answer 정답을 배열 값으로 받음
     * @param {Number} index 문제 번호
     * @return {undefined} 반환 값 없음
     */
    sayMembers(answer, index) {
        let ul = document.querySelector('.answer'),
            li = document.createElement('li');

        li.innerHTML = `<em>A${index}.</em> ${answer.join(', ')}`;
        ul.append(li);
    }

    hello2020() {
        const uiDev2 = ['최은혜', '문채민', '윤홍미'];

        this.members = this.members.filter(member => uiDev2.indexOf(member) < 0);
        // this.members = this.members.filter(member => !uiDev2.includes(member));

        return this.members;
    }

    getFoods() {
        let finders = [],
            members = [];

        for (let i = 0; i < this.members.length; i++) {
            if (0 !== this.members.indexOf(this.members[i]) % 2) {
                members.push(this.members[i]);
                continue;
            };
            finders.push(this.members[i]);
        }
        this.members = members;
        this.finders = finders;

        return finders;
    }

    drawLots() {
        let winners = [],
            stragglers = this.finders.slice(),
            luckyNumber,
            max = 2;

        for (let i = 0; winners.length < max; i++) {
            luckyNumber = Math.floor(Math.random() * (this.finders.length - i));
            winners[i] = stragglers.splice(luckyNumber, 1)[0];
        }
        this.winners = winners;
        this.stragglers = stragglers;

        return winners;
    }

    returnHome() {
        let survivor = this.members.concat(this.winners);

        return survivor;
    }
}

let lifeboat = new UIDev(['윤효상', '신비', '김희진', '홍수조', '권은주', '김원진', '최은혜', '문채민', '이형주', '조현욱', '윤홍미', '김지혜']);
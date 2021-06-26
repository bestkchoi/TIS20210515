import React, {Component, PureComponent, Fragment} from "react";


import CrudList from './CrudList'
import CrudInput from './CrudInput'
class CrudApp extends React.Component {

    static defaultProps = {  /*  props의 디폴트 값 설정 */  }
    static propsTypes = {  /* props의 프로퍼티 타입 설정 */ }
    state = {
        // 상태값(변수)을 정의한다.
        items: [
            {id:1, name: "슈퍼맨", power: 100},
            {id:2, name: "아쿠아맨", power: 300},
            {id:3, name: "스파이더맨", power: 500},
            {id:4, name: "배트맨", power: 30},
        ],
    }
    style = {
        // 컴포넌트 내부에서 사용할 인라인 스타일을 정의한다.
        // getter 를 사용하면 객체 내부 참조가 가능하다.

    }
    func = {
        // func에 정의된 메서드는 반드시 constructor에서 this를 bind() 처리해야 한다.
        // func에는 자식 컴포넌트에 넘길 메서드만 작성한다.
        // 왜 자식에게 부모 메서드를 넘기나? 부모의 상태값을 변경하기 위해서.
        doIns(newitem){
            // ...생략
            // this.state.items 에 max(id) 를 찾는 방법
            // this.state.items.reduce() 사용해서

            if( this.state.items.length>0 ){
                // 추가
                const maxitem = this.state.items.reduce( (prev,curt)=>{

                    if( prev.id> curt.id)
                        return prev;
                    else
                        return curt;
                });

                newitem.id = maxitem.id + 1;
            }
            else {
                // 배열 생성
                newitem.id = 1;
            }


            // this.state.items = this.state.items.push( newitem );
            const newitems = [ ...this.state.items, newitem ];
            this.setState({
                ...this.state,
                items: newitems,
            })
        },
        doDel(index, item){
            const r = window.confirm("정말로 삭제하시겠습니까?");

            if( !r ) return ;

            // 배열에서 삭제. splice 나 filter 를 사용한다
            // 새로운 배열 만들기
            const newitems = this.state.items.filter( (element,index)=>{
                return element.id !== item.id;
            });

            this.setState({
                ...this.state,
                items: newitems,
            })
        },
        doUp(index, item){
            //100씩 증가. item.power = item.power + 100;

            // 새로운 배열 만들기
            const newitems = this.state.items.map( (element,index)=>{
                if( element.id === item.id ) {
                    element.power = element.power + 100;
                }
                return element;
            });

            this.setState({
                ...this.state,
                items: newitems,
            })
        },
        doDown(index, item){
            // 50씩 감소. item.power = item.power - 50;

            // 새로운 배열 만들기
            const newitems = this.state.items.map( (element,index)=>{
                if( element.id === item.id ) {
                    element.power = element.power - 50;
                }
                return element;
            });

            this.setState({
                ...this.state,
                items: newitems,
            })
        },
        doSave(newitem){
            // 새로운 배열 만들기
            const newitems = this.state.items.map( (element,index)=>{
                if( element.id === newitem.id ) {
                    return newitem;
                }
                else {
                    return element;
                }
            });

            this.setState({
                ...this.state,
                items: newitems,
            })
        },
    }
    constructor(props) {
        super()
        // this 바인딩. 예시) this.func.handler = this.func.handler.bind(this);
        // func 에 정의한 메서드는 반드시 this bind 처리해야 한다.
        this.func.doIns  = this.func.doIns.bind(this);
        this.func.doDel  = this.func.doDel.bind(this);
        this.func.doUp   = this.func.doUp.bind(this);
        this.func.doDown = this.func.doDown.bind(this);
        this.func.doSave = this.func.doSave.bind(this);

        // ref 만들기. 예시) this.inputref = React.createRef()

    }
    componentDidMount() {
        // 마운트 완료 후에 실행됨 : 페이지 load 될 때 한번
        // componentDidMount가 사용되는 경우: redux 구독 설정, focus 줄때
    }
    componentDidUpdate(prevProps, prevState) {
        // 업데이트 완료 후에 실행됨 : 여러번, state 가 변경될 때마다
    }
    componentWillUnmount() {
        // 언마운트 완료 후에 실행됨 : 페이지 unload 될 때 한번
        // componentWillUnmount가 사용되는 경우: redux 구독 해제, 이벤트 핸들러 해제
    }
    handler = (event)=>{
        // 이벤트 핸들러는 화살표 함수로 만들면 this bind()를 생략해도 된다
        console.log(event.target)
    }
    render() { // JSX로 화면 만들기
        return (
            <div id="app">
                <h1>Creat Read Update Delete</h1>
                <CrudInput {...this.props} {...this.state} {...this.func} {...this.style}></CrudInput>
                <hr/>

                <CrudList {...this.props} {...this.state} {...this.func} {...this.style}></CrudList>
            </div>
        )
    }
}
export default CrudApp;
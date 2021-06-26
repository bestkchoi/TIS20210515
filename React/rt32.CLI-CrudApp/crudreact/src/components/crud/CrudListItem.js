import React from 'react'

class CrudListItem extends React.Component {

    static defaultProps = {  /*  props의 디폴트 값 설정 */  }
    static propsTypes = {  /* props의 프로퍼티 타입 설정 */ }
    state = {
        // 상태값(변수)을 정의한다.
        isEditMode: false,
    }
    style = {
        // 컴포넌트 내부에서 사용할 인라인 스타일을 정의한다.
        // getter 를 사용하면 객체 내부 참조가 가능하다.

    }
    func = {
        // func에 정의된 메서드는 반드시 constructor에서 this를 bind() 처리해야 한다.
        // func에는 자식 컴포넌트에 넘길 메서드만 작성한다.
        // 왜 자식에게 부모 메서드를 넘기나? 부모의 상태값을 변경하기 위해서.

    }
    constructor(props) {
        super()
        // this 바인딩. 예시) this.func.handler = this.func.handler.bind(this)
        // func 에 정의한 메서드는 반드시 this bind 처리해야 한다.

        // ref 만들기. 예시) this.inputref = React.createRef()
        this.refUserName = React.createRef();
        this.refUserPower = React.createRef();
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
    doDel = (event)=>{
        // 부모 콜백 메세드 호출. CrudApp.doDel() 호출
        const {index, item} = this.props;
        this.props.doDel(index, item); // === CrudApp.func.doDel(index, item)
    }
    doUp = (event)=>{
        // 부모 콜백 메세드 호출. CrudApp.doUp() 호출
        const {index, item} = this.props;
        this.props.doUp( index, item);
    }
    doDown = (event)=>{
        // 부모 콜백 메세드 호출. CrudApp.doUp() 호출
        const {index, item} = this.props;
        this.props.doDown( index, item);
    }
    doEdit = (event)=>{
        // formEdit 가 보이게 설정
        // this.state.isEditMode = true;
        this.setState({
            ...this.state,
            isEditMode: true
        })
    }
    doSave = (event)=>{

        // 유효성 검사.
        // name 입력 여부,
        // power 입력 여부, 숫자 입력 여부,

        // formView 가 보이게 설정
        ///this.state.isEditMode = false;
        this.setState({
            ...this.state,
            isEditMode: false
        })

        // 부모 콜백 메세드 호출. CrudApp.doSave() 호출
        const {item, index} = this.props;
        const newitem = {
            id: item.id,
            name: this.refUserName.current.value,
            power: Number(this.refUserPower.current.value) ,
        }
        this.props.doSave( newitem );
    }
    render() { // JSX로 화면 만들기
        // const item = this.props.item;
        const {item} = this.props;

        // power가 300이상인 사람은 글자색을 red로 bold스타일로 출력
        const strong = item && item.power>=300 ? "strong":"";

        // 화면 표시
        const formView = (
            <tr className={strong}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.power}</td>
                <td>
                    <button onClick={this.doDel}>Del</button>
                    <button onClick={this.doUp}>Power Up</button>
                    <button onClick={this.doDown}>Power Down</button>
                    <button onClick={this.doEdit}>Edit</button>
                </td>
            </tr>
        );

        // 화면 수정
        const formEdit = (
            <tr className={strong}>
                <td>{item.id}</td>
                <td>
                    <input type="text"
                           name="name"
                           placeholder="이름을 입력하세요"
                           ref={this.refUserName}
                           defaultValue={item.name} />
                </td>
                <td>
                    <input type="number"
                           name="power"
                           placeholder="숫자만 입력하세요"
                           ref={this.refUserPower}
                           defaultValue={item.power} />
                </td>
                <td>
                    <button onClick={this.doDel}>Del</button>
                    <button onClick={this.doUp}>Power Up</button>
                    <button onClick={this.doDown}>Power Down</button>
                    <button onClick={this.doSave}>Save</button>
                </td>
            </tr>
        )

        if( this.state.isEditMode ){
            return formEdit;
        }
        else {
            return formView;
        }
    }
};

export default CrudListItem;
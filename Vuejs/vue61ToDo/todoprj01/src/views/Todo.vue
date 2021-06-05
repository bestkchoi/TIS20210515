<style scoped>
body {
    text-align: center;
    background-color: #f6f6f8;
}
input {
    border-style: groove;
    width: 200px;
}
button {
    border-style: groove;
}
.shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>

<template>
    <div id="app">
        <!-- TodoHeader -->
        <todo-header></todo-header>

        <!-- TodoInput -->
        <todo-input v-on:addTodo="addTodo"></todo-input>

        <!-- TodoList -->
        <todo-list v-bind:todoItems="todoItems"></todo-list>

          <!-- TodoFooter -->
        <todo-footer v-on:clearAll="clearAll"></todo-footer>

    </div>
</template>

<script>
import TodoHeader from '../components/todo/TodoHeader.vue';
import TodoInput from '../components/todo/TodoInput.vue';
import TodoList from '../components/todo/TodoList.vue';
import TodoFooter from '../components/todo/TodoFooter.vue';

    export default {
        /* pdtmc^2w */
        props: [] ,
        data: function() {
            return {
            /* 인슨턴스 안에서 사용되는 변수 등록, 공유 변수 */
                todoItems: [
                    { id: 1, todo: "영화보기", done: false },
                    { id: 2, todo: "주말 산책", done: true },
                    { id: 3, todo: "ES6 학습", done: false },
                    { id: 4, todo: "잠실 야구장", done: false }
                ],
            }
        },
        //template: ``,
        methods: {
            addTodo: function(newTodoItem) {
                if( newTodoItem && newTodoItem.trim() !== "" ){
                    // todoItems에서 최대 id 값을 구하는 방법.
                    // 방법1. todoItems.reduce() 를 사용하여 newId를 구하는 방법
                    // 방법2. todoItems.map()과 Math.max()를 사용하여 newId를 구하는 방법

                    // 방법1. todoItems.reduce() 를 사용하여 최대 id 값을 갖고있는 item을 찾는다.
                    var maxObj = null;
                    if( this.$data.todoItems.length > 0) {
                        // 최대 id 값을 갖고있는 item을 찾는다.
                        maxObj = this.$data.todoItems.reduce( (previousValue, currentValue)=>{
                            if( previousValue.id >= currentValue.id ) {
                                return previousValue;
                            }
                            else {
                                return currentValue;
                            }
                        });
                    }
                    else {
                        // 빈 배열인 경우
                        maxObj = {
                            id: 0,
                            todo: "",
                            done: false
                        }
                    }

                    var newid = maxObj.id + 1;


                    // 2. Array.map()과 Math.max()를 사용하여 newId를 구하는 방법
                    var arrIds = this.$data.todoItems.map( function(el){
                        return el.id;
                    });
                    var newid  = Math.max(...arrIds) + 1;

                    // 추가할 객체 생성:
                    // input에 입력된 값 ==> newTodoItem ;
                    var newTodo = {
                        id: newid,
                        todo: newTodoItem ,
                        done: false,
                    }

                    // this.$data.todoItems 에 newTodo를 추가하시오.
                    // this.$data.todoItems[this.$data.todoItems.length] = newTodo
                    this.$set(this.$data.todoItems, this.$data.todoItems.length, newTodo)

                    // input 태그에 남아있는 입력값 지우기
                    // newTodoItem = "";
                    this.$set(this.$data, "newTodoItem", "");
                }
                else {
                    this.$data.showModal = !this.$data.showModal;
                }

            },
            doneToggle: function(id, index){
                //console.log(event.target);
                // 데이터를 바꾸면은 화면이 바뀐다.

                // 예시:
                // 변경전: { id: 1, todo: "영화보기", done: false }
                // 변경후: { id: 1, todo: "영화보기", done: true }

                // object array 에서 index를 찾는 방법 ===> findIndex()
                if( index === null || index === undefined) {
                    var findidx = this.$data.todoItems.findIndex( function(item){
                        //return item.id === id;
                        if( item.id === id ){
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                }

                // 방법1
                // var obj = this.$data.todoItems[index] ; // { id: ??, todo: ???, done:?? }
                // obj.done = !obj.done;

                // 방법2
                // this.$data.todoItems[index].done = !this.$data.todoItems[index].done;
                this.$set( this.$data.todoItems[index], "done", !this.$data.todoItems[index].done);
            },
            removeTodo: function(id, index){
                // 참조 타입 변수이면 재할당(=== 깊은 복사) 필요.
                // 방법1: array.splice() 을 사용하는 방법
                // 방법2: array.map() 을 사용하는 방법
                this.$data.todoItems.splice(index, 1);

                // 이벤트 취소를 이용하여 click 버블링 막기
               stopPropagation();
              preventDefault();
            },
            clearAll: function(event) {
                console.log(event.target);
                // 전체 삭제
                // this.$data.todoItems = [];
                this.$set(this.$data, "todoItems", []);
            },
        },
        components: {
            /* 컴포넌트 등록. 예시) "태그명" : 컴포넌트명 */
            "todo-header" : TodoHeader,
            "todo-input" : TodoInput,
            "todo-list" : TodoList,
            "todo-footer" : TodoFooter
        },
        computed: {
            /* 자동처리 + 동기식. 메서드로 작성. return 필수. */


        },
        watch: {
            /* 자동처리 + 비동기식. data 에 등록된 프로퍼티 모니터링. 메서드로 작성. 매개변수 입력 필수  */

        },
        mounted: function() {
            console.log("mounted");
        },
        updated: function() {
            console.log("updated");
        },
    }
</script>
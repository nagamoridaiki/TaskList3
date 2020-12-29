const button = document.getElementById("button")
const taskList = document.getElementById("taskList")
let progressList = document.getElementsByName('process')
let newTask = document.getElementById("newTask")
let inicialTableTag = 
'<tr>' +
    '<th>' + "ID" + '</th>' +
    '<th>' + "コメント" + '</th>' +
    '<th>' + "状態" + '</th>' +
'<tr>'
taskList.innerHTML = inicialTableTag
let tasks = { taskName:[], progress:[]}

//新規タスクの追加ボタンが押下された時の処理
button.addEventListener("click", ()=>{
    if(newTask.value == ""){
        alert("入力が空です。")
    }else{
        //selectedProgress = checkProgress()
        //tasks.progress.push(selectedProgress)
        tasks.taskName.push(newTask.value)
        newTask.value == ""
        display()
    }
})

/*
//どの進捗が選ばれたかのチェック
function checkProgress(){
    let mode = ""
    for (let i = 0 ; i < progressList.length ; i++) {
        progressList[i].checked ? mode = progressList[i].value : null
    }
    console.log("mode", mode)
    return mode
}
*/

//追加されたタスクの画面描画
function display(){
    taskList.innerHTML = inicialTableTag
    console.log("tasks", tasks)

    for (let i = 0 ; i < tasks.taskName.length ; i++) {
        const tr = document.createElement("tr")
        tr.innerHTML = 
        '<td>' + i + '</td>' + 
        '<td>' + tasks.taskName[i] + '</td>' + 
        '<td>' + 
            //'<button>' +  tasks.progress[i] + '</button>' +
            '<button>' +  "作業中" + '</button>' +
            '<button>' + "削除" + '</button>' +
        '</td>'
        taskList.appendChild(tr)
    }
}


const button = document.getElementById('button')
const taskList = document.getElementById('taskList')
let progressList = document.getElementsByName('process')
let newTask = document.getElementById('newTask')
let initialTableTag = 
'<tr>' +
    '<th>' + 'ID' + '</th>' +
    '<th>' + 'コメント' + '</th>' +
    '<th>' + '状態' + '</th>' +
'<tr>'
taskList.innerHTML = initialTableTag
const tasks = [];
const progressStatus = {
    running : '作業中',
    complete : '完了'
}

//新規タスクの追加ボタンが押下された時の処理
button.addEventListener('click', ()=>{
    if(newTask.value === ''){
        alert('入力が空です。')
    }else{
        tasks.push({ taskName : newTask.value, progress : progressStatus.running });
        newTask.value = ''
        display()
    }
})


//追加されたタスクの画面描画
function display(){
    taskList.innerHTML = initialTableTag

    for (let i = 0 ; i < tasks.length ; i++) {
        const tr = document.createElement("tr")
        tr.innerHTML = 
        '<td>' + i + '</td>' + 
        '<td>' + tasks[i].taskName + '</td>' + 
        '<td>' + 
            '<button class=next>' + tasks[i].progress + '</button>' +
            '<button class=remove>' + "削除" + '</button>' +
        '</td>'
        taskList.appendChild(tr)

        removeBtn = document.getElementsByClassName('remove')
        for (let k = 0 ; k < removeBtn.length ; k++) {
            removeBtn[k].setAttribute('id', k)
            removeBtn[k].addEventListener('click', removeItem);
        };

        nextbtn = document.getElementsByClassName('next')
        for (let n = 0 ; n < nextbtn.length ; n++) {
            nextbtn[n].setAttribute('id', n)
            nextbtn[n].addEventListener('click', moveOnProgress);
        };
    }
}

// 削除ボタンが押されたら発動
function removeItem(){
    
    const id = this.getAttribute('id');
    tasks.splice(id, 1);
    display()
}

//3-3
//作業中から完了
//完了から作業中へ
function moveOnProgress(){
    const id = this.getAttribute('id');
    tasks[id].progress === '作業中' ? tasks[id].progress = '完了' : tasks[id].progress = '作業中'
    display()
}




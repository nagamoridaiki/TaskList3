const button = document.getElementById('button')
const taskList = document.getElementById('taskList')
let progressList = document.getElementsByName('process')
let newTask = document.getElementById('newTask')
let initialTableTag = 
    '<th>' + 'ID' + '</th>' +
    '<th>' + 'コメント' + '</th>' +
    '<th>' + '状態' + '</th>'
taskList.innerHTML = initialTableTag;
const tasks = [];
let displayTasks = [];
const progressStatus = {
    running : '作業中',
    complete : '完了'
}
let indexcount = 0;

//新規タスクの追加ボタンが押下された時の処理
button.addEventListener('click', ()=>{
    if(newTask.value === ''){
        alert('入力が空です。');
    }else{
        tasks.push({
            index : indexcount,
            taskName : newTask.value,
            progress : progressStatus.running
        });
        newTask.value = '';
        indexcount += 1;
        display();
    }
})

//追加されたタスクの画面描画
function display() {
    taskList.innerHTML = initialTableTag;
    displayTasks = switchMode();

    for (let i = 0 ; i < displayTasks.length ; i++) {
        const tr = document.createElement("tr");
        tr.setAttribute('id', displayTasks[i].index);
        tr.innerHTML = 
        '<td>' + displayTasks[i].index + '</td>' + 
        '<td>' + displayTasks[i].taskName + '</td>' + 
        '<td>' + 
            '<button class=next>' + displayTasks[i].progress + '</button>' +
            '<button class=remove>' + "削除" + '</button>' +
        '</td>'
        taskList.appendChild(tr);

        removeBtn = document.getElementsByClassName('remove');
        for (let k = 0 ; k < removeBtn.length ; k++) {
            removeBtn[k].setAttribute('id', displayTasks[k].index);
            removeBtn[k].addEventListener('click', removeItem);
        };

        nextbtn = document.getElementsByClassName('next');
        for (let n = 0 ; n < nextbtn.length ; n++) {
            nextbtn[n].setAttribute('id', displayTasks[n].index);
            nextbtn[n].addEventListener('click', moveOnProgress);
        };
    }
}

// 作業項目の削除
function removeItem() {
    const id = this.getAttribute('id');
    for (let i = 0 ; i < tasks.length ; i++) {
        if (tasks[i].index === Number(id)) {
            tasks.splice(i, 1)
        }
    }
    attachIndex();//再度tesksの番号を割り振る
    display();
}

//作業進捗の切り替え
function moveOnProgress() {
    const id = this.getAttribute('id');
    for (let i = 0 ; i < displayTasks.length ; i++) {
        if (displayTasks[i].index === Number(id)) {
            if (displayTasks[i].progress === progressStatus.running) {
                displayTasks[i].progress = progressStatus.complete;
            } else {
                displayTasks[i].progress = progressStatus.running;
            }
        }
    }
    display();
}

//作業進捗の選択によって表示非表示の切り替え
function switchMode() {
    if(tasks){
        displayTasks = [];
        if (progressList[1].checked) {//進行中にチェックがついていた場合
            for (let n = 0 ; n < tasks.length ; n++) {
                tasks[n].progress === progressStatus.running ? displayTasks.push(tasks[n]) : null;
            }
        }else if (progressList[2].checked) {
            for (let n = 0 ; n < tasks.length ; n++) {
                tasks[n].progress === progressStatus.complete ? displayTasks.push(tasks[n]) : null;
            }
        }else{
            for (let n = 0 ; n < tasks.length ; n++) {
                displayTasks.push(tasks[n]);
            }
        }
    }
    return displayTasks;
}

//再度tesksの番号を割り振る
function attachIndex() {
    for(let n = 0 ; n < tasks.length ; n++) {
        tasks[n].index = n;
    }
    indexcount = tasks.length;
}
let flag=true
let currentelement
let todo=[]
function initial()
{
    if(flag)
    {
        document.querySelector(".container").style.display="block"
        document.querySelector(".container1").style.display="none"
    }
    else
    {
        document.querySelector(".container").style.display="none"
        document.querySelector(".container1").style.display="block"
    }
    if(todo.length!=0)
    {
        document.querySelector(".noitem").style.display="none"
    }
    else
    {
        document.querySelector(".noitem").style.display="block"
    }
}
initial()
function redirect(element)
{
    let id=element.parentElement.parentElement.getAttribute("data-key")
    let currentTodoList
    for(let i=0;i<=todo.length-1;i++)
    {
        if(todo[i].id==id)
        {
            currentTodoList=todo[i]
        }
    }
    flag=false
    initial()
    document.getElementById("para-heading1").textContent=currentTodoList.input
    document.querySelector(".card1").setAttribute("data-key",currentTodoList.id)
    let e=document.querySelector(".card-ul1")
    var child=e.lastElementChild
    while(child)
    {
        e.removeChild(child)
        child=e.lastElementChild
    }
    for(let i=0;i<=currentTodoList.subTask.length-1;i++)
    {
        let classput1=currentTodoList.subTask[i].marked
        ? "markCompleted"
        : "card123";
        let classput2=currentTodoList.subTask[i].marked
        ? ""
        :  `<button class="markdone" onclick="markcompleted(this)">markdone</button>`;
        const node=document.createElement("li")
        node.setAttribute("data-key",currentTodoList.subTask[i].id)
        node.style.marginBottom="5px"
        node.innerHTML=`<p class=${classput1} style="display:inline-block;margin:0">${currentTodoList.subTask[i].subInput}</p> ${classput2}`
        e.append(node)
    }
}
function toggle()
{
    var blur
    if(flag)
    {
        blur=document.querySelector(".container")
    }
    else
    {
        blur=document.getElementById(".container1")
    }
    blur.classList.toggle("blur")
    let visible=document.querySelector(".pop-list")
    visible.classList.toggle("active")
}
function toggleitem(element)
{
    currentelement=element
    var blur
    if(flag)
    {
        blur=document.querySelector(".container")
    }
    else
    {
        blur=document.querySelector(".container1")
    }
    blur.classList.toggle("blur")
    let visible=document.querySelector(".pop-item")
    visible.classList.toggle("active")
}
function renderTodo()
{
    initial()
    const list=document.querySelector(".card-container")
    var child=list.lastElementChild
    while(child)
    {
        list.removeChild(child)
        child=list.lastElementChild
    }
    for(let i=0;i<=todo.length-1;i++)
    {
        const node=document.createElement("div")
        node.classList.add("card")
        node.setAttribute("data-key",todo[i].id)
        node.innerHTML=`<div class="card-heading">
                            <p onclick="redirect(this)">${todo[i].input}</p>
                            <hr class="card-hr">
                        </div>
                        <ul class="card-ul">
                        </ul>
                        <div class="footer">
                            <button class="card-button" onclick="removeToDo(this)" ><i class="fa fa-trash fa-2x fa-cog" aria-hidden="true"></i></button>
                            <button class="card-button" onclick="toggleitem(this)" ><i class="fa fa-plus fa-2x fa-cog" aria-hidden="true"></i></button>
                        </div>`
        list.append(node);
    let currentTodo = todo[i];
    for(let j=0;j<=currentTodo.subTask.length-1;j++)
    {
        let classput1=currentTodo.subTask[j].marked
        ? "markCompleted"
        : "class1234";
        let classput2=currentTodo.subTask[j].marked
        ? ""
        : `<button class="markdone" onclick="markcompleted(this)">markdone</button>`;
        var linode=document.createElement("li")
        linode.setAttribute("data-key",currentTodo.subTask[j].id)
        linode.style.marginBottom="5px"
        linode.innerHTML=`<p class=${classput1} style="display: inline-block;margin:0">${currentTodo.subTask[j].subInput}</p> ${classput2}`
        node.children[1].append(linode)
    }
    }
}
function addToDo()
{
    let input=document.getElementById("heading").value
    if(input!=="")
    {
    todolist={
        input,
        id:Date.now(),
        subTask:[],
        completed:false
    }
    todo.push(todolist)
    toggle()
    goBack()   
}
}
function subToDo()
{
    var subInput=document.getElementById("sub-heading").value
    if(subInput!=="")
    {
    subtasklist={
        subInput,
        id:Date.now(),
        marked:false
    }
    var node=document.createElement("li")
    node.setAttribute("data-key",subtasklist.id)
    node.style.marginBottom="5px"
    node.innerHTML=`<p style="display: inline-block;margin:0">${subtasklist.subInput}</p><button class="markdone" onclick="markcompleted(this)">markdone</button>`
    var ul=currentelement.parentElement.parentElement.children[1]   
    var id=currentelement.parentElement.parentElement.getAttribute("data-key")
    ul.append(node)
    for(i=0;i<=todo.length-1;i++)
    {
        
        if(todo[i].id==id)
        {
            todo[i].subTask.push(subtasklist)
        }
    }
    toggleitem()
    }
}
function markcompleted(element)
{
    //console.log(todo)
    var para=element.parentElement.children[0]
    para.classList.add("markcompleted")
    var id1=element.parentElement.parentElement.parentElement.getAttribute("data-key")
    for(i=0;i<=todo.length-1;i++)
    {
        
        if(todo[i].id==id1)
        {
            
            for(j=0;j<=todo[i].subTask.length-1;j++)
            {
                
                var id2=element.parentElement.getAttribute("data-key")
                
                if(todo[i].subTask[j].id==id2)
                {
                    todo[i].subTask[j].marked=true  
    
                }
            }
        }
    }
    element.parentElement.removeChild(element)
}

function removeToDo(element)
{
    var cardContainer=element.parentElement.parentElement.parentElement;
    var card=element.parentElement.parentElement;
    var id3=card.getAttribute("data-key")
    for(i=0;i<=todo.length-1;i++)
    {
        if(todo[i].id==id3)
        {
            todo.splice(i,1)
        }
    }
    if (!flag) 
    {
        goBack();
    } 
    else 
    {
        cardContainer.removeChild(card);
        initial();
    }
}
function goBack()
{
    flag=true
    renderTodo()
}
/*

                <div class="card">
                    <div class="card-heading">
                        <p>ganeshkdt</p>
                        <hr>
                    </div>
                    <ul class="card-ul">
                        <li style="margin-bottom: 5px;"><p style="display: inline-block;margin:0">list1</p><button class="markdone" >markdone</button></li>
                        <li style="margin-bottom: 5px;"><p style="display: inline-block;margin:0">list1</p><button class="markdone" >markdone</button></li>
                    </ul>
                    
                    <div >
                        <button class="card-button" ><i class="fa fa-trash-o fa-2x fa-cog" aria-hidden="true"></i></button>
                        <button class="card-button" ><i class="fa fa-plus fa-2x fa-cog" aria-hidden="true"></i></button>
                    </div>
                </div>
           
*/ 
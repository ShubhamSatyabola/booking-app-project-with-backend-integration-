var form = document.getElementById('addform');
var ul = document.getElementById('list-group');
var Id = document.getElementById('userId');

form.addEventListener('submit', setlocalStorage)
window.addEventListener('DOMContentLoaded', ()=>{
   axios.get("http://localhost:3000/get-user")
.then((res)=>{
    for(i in res.data.allUsers){
    
    showOnScreen(res.data.allUsers[i])

}
}).catch(err=>console.log(err))
})


function setlocalStorage(e){
    e.preventDefault();
    
    var Name = e.target.visitor_name.value;
    var email = e.target.visitor_email.value;
    var phone = e.target.visitor_phone.value;
    var data = {Name , email , phone};
    
    axios.post("http://localhost:3000/add-user", data)
    .then((res)=>{
        const user = res.data.newUserDetails
        showOnScreen(user)
    }
       
       
    )
    .catch((err)=>console.log(err))

    
    
      }
function showOnScreen(data){
    var li = document.createElement('li')
    li.className = 'list-group-item'
    li.textContent = `${data.name}  ${data.email}  ${data.number}`
    
    const btn = document.createElement('button')
    btn.className = 'btn btn-dark float-right Delete'
    btn.appendChild(document.createTextNode('Delete'))
    
    btn.onclick = () => {
        axios.delete(`http://localhost:3000/delete-user/${data.id}`)
        .then(ul.removeChild(li))


        
    }
    const edit = document.createElement('button')
    edit.className = 'btn btn-dark float-right edit'
    edit.appendChild(document.createTextNode('Edit'))
    
    edit.onclick = () => {

        document.getElementById('yourname').value=data.name;
        document.getElementById('email').value=data.email;
        document.getElementById('phone').value=data.number;
        document.getElementById('button').innerText="Edit-Details"

        axios.delete(`http://localhost:3000/delete-user/${data.id}`)
        .then(ul.removeChild(li))

    }

    li.appendChild(btn)
    li.appendChild(edit)
    ul.appendChild(li)

}

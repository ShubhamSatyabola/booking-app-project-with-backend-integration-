var form = document.getElementById('addform');
var ul = document.getElementById('list-group');
var Id = document.getElementById('userId');

form.addEventListener('submit', setlocalStorage)
window.addEventListener('DOMContentLoaded', async ()=>{
 try {const res = await axios.get("http://localhost:3000/get-user");
    for(i in res.data.allUsers){
    
    showOnScreen(res.data.allUsers[i])

}}
catch(err){console.log(err)}
})


async function setlocalStorage(e){
    
   try {
    e.preventDefault();
    var Name = e.target.visitor_name.value;
    var email = e.target.visitor_email.value;
    var phone = e.target.visitor_phone.value;
    var data = {Name , email , phone};
    
    const response = await axios.post("http://localhost:3000/add-user", data)
        const user = response.data.newUserDetails
        showOnScreen(user)
    
   } 
    catch(err){console.log(err)}
}
async function showOnScreen(data){
    try {var li = document.createElement('li')
    li.className = 'list-group-item'
    li.textContent = `${data.name}  ${data.email}  ${data.number}`
    
    const btn = document.createElement('button')
    btn.className = 'btn btn-dark float-right Delete'
    btn.appendChild(document.createTextNode('Delete'))
    
    btn.onclick = () => {
     axios.delete(`http://localhost:3000/delete-user/${data.id}`)
    .then(ul.removeChild(li))
    .catch(err=>console.log(err))


        
    }
    const edit = document.createElement('button')
    edit.className = 'btn btn-dark float-right edit'
    edit.appendChild(document.createTextNode('Edit'))
    
    edit.onclick = async () => {
        

        document.getElementById('yourname').value=data.name;
        document.getElementById('email').value=data.email;
        document.getElementById('phone').value=data.number;
        document.getElementById('button').innerText="Edit-Details"

        // const updatedName = document.getElementById('yourname').value;
        // const updatedEmail = document.getElementById('email').value
        // const updatedNumber = document.getElementById('phone').value
        // const updatedData =  {updatedName, updatedEmail, updatedNumber}
        axios.delete(`http://localhost:3000/delete-user/${data.id}`)
        .then(ul.removeChild(li))
        .catch(err=>console.log(err))

    }

    li.appendChild(btn)
    li.appendChild(edit)
    ul.appendChild(li)
}catch(err){
    console.log(err)
}

}

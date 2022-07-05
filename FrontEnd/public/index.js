const drop = document.querySelector(".drop-file")
const browse = document.querySelector("#browse")
const fileinp = document.querySelector("#fileinp")
const percentval = document.querySelector("#percent")
const linkInp = document.querySelector("#link")
const copy = document.querySelector("#copy")
const link= document.querySelector(".link")
const progressbar = document.querySelector(".progress-bar")
const UploadProgress = document.querySelector(".Upload-Progress")
const uploadURL = `https://filesharewithall.herokuapp.com/api/file`;
drop.addEventListener("dragover",(e)=>{
    e.preventDefault()
    if(!drop.classList.contains("dropped")){
        drop.classList.add("dropped")
    }
})
drop.addEventListener("dragleave",(e)=>{
    e.preventDefault()
    drop.classList.remove("dropped")
})
drop.addEventListener("drop",(e)=>{
    e.preventDefault()
    drop.classList.remove("dropped")
    fileinp.files = e.dataTransfer.files
    e.dataTransfer.files = null
    console.log(fileinp.files)
    uploadFile()
})

browse.addEventListener("click",()=>{
    fileinp.click()
})
fileinp.addEventListener("change",()=>{
    uploadFile()
})
function uploadFile(){
    link.style.display = "none"
    const xhr = new XMLHttpRequest()
    const form = new FormData()
    form.append("myfile",fileinp.files[0])
    xhr.onreadystatechange = ()=>{
        UploadProgress.style.display = "block"
        xhr.upload.onprogress = (e)=>{
            
            const percent = Math.round((e.loaded/e.total)*100)
            progressbar.style.width = `${percent}%`
            percentval.innerHTML = `${percent}%`
        }
        if(xhr.readyState == XMLHttpRequest.DONE)
        {
           
            showlink(JSON.parse(xhr.responseText))
            
        }
    }
    xhr.open("POST",uploadURL)
    xhr.send(form)
}
const showlink = ({Link})=>{
    UploadProgress.style.display = "none"
    progressbar.style.width = `0%`
    percentval.innerHTML = `0%`
    link.style.display = "flex"
    linkInp.value = Link
}
function copyvalue(){
    console.log("hello")
    linkInp.select()
    document.execCommand("copy")
}

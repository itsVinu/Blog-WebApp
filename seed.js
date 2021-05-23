const mongoose = require('mongoose');
const Blog = require('./models/blogs')


const arr = [
    {
        title:"Travel Blog",
        img:"https://images.unsplash.com/photo-1619722367227-db6f838e93b8?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8Ym84alFLVGFFMFl8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        category:"travel",
        date:"2 May, 2021"
    },
    {
        title:"Blog Travel",
        img:"https://images.unsplash.com/photo-1612438214708-f428a707dd4e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2VkYXJuYXRofGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        category:"travel",
        date:"2 May, 2021"
    },
    {
        title:"Travel",
        img:"https://images.unsplash.com/photo-1617860931879-19d32ec9912d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8a2VkYXJuYXRofGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        category:"travel",
        date:"2 May, 2021"
    },
    {
        title:"Travel Bloggig",
        img:"https://images.unsplash.com/photo-1571536802807-30451e3955d8?ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OHwxMTYyMTUyOXx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        category:"travel",
        date:"2 May, 2021"
    },
    {
        title:"Traveller Blog",
        img:"https://images.unsplash.com/photo-1571328565610-56f07b8bf3ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3wxMTYyMTUyOXx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
        desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        category:"travel",
        date:"2 May, 2021"
    }
]

async function seed() {
    await Blog.insertMany(arr)
    .then(()=>{
        console.log('db seeded')
    })
    .catch(err=>{
        console.log(err)
    })
}


module.exports = seed;
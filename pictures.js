let data = JSON.parse(localStorage.getItem('c'));
document.querySelectorAll('#pictures-list img').forEach((e,i)=>{

    data.images['url'+ (i + 2)] = e.getAttribute('src') ||  e.getAttribute('data-src');

});

let final_data = JSON.parse(localStorage.getItem('c'));
final_data = data;

localStorage.setItem('c',JSON.stringify(final_data));
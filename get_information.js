let mobile_object = {};
let brand = null;
let title = null ;
let release_date = null;
let small_spec = null;
let android_os = null;
let small_ram = null;
let screen_size = null;
let resolution = null;
let camera_pixel = null;
let video_pixel = null;
let ram = null;
let chipset = null;
let battery = null;
let battery_capacity = null;
let spec_comment = null;

function stringy(stringVar)
{
    return stringVar == '' ? 'empty' : stringVar.toLowerCase().replace(' ','_');
}

function start_fetch()
{

    mobile_object = {};
    mobile_object.original_mobile_url=window.location.href;
    let brandName = window.location.href.split('/')[window.location.href.split('/').length-1].split('_')[0];
    brandName = brandName.charAt(0).toUpperCase() + brandName.slice(1)
    console.log(mobile_object.brand = brandName);
    console.log(mobile_object.title = document.getElementsByClassName('specs-phone-name-title')[0].innerText);
    console.log(mobile_object.release_date = document.getElementsByClassName('icon-launched')[0].nextElementSibling.innerText);
    console.log(mobile_object.small_spec = document.getElementsByClassName('icon-mobile2')[0].nextElementSibling.innerText);
    console.log(mobile_object.android_os = document.getElementsByClassName('icon-os')[0].nextElementSibling.innerText);
    console.log(mobile_object.small_ram = document.getElementsByClassName('icon-sd-card-0')[0].nextElementSibling.innerText);
    console.log(mobile_object.screen_size = document.querySelector('.help-display .accent').children[0].innerText);
    console.log(mobile_object.resolution = document.querySelector('.help-display .accent').nextElementSibling.innerText);
    mobile_object.images = {};
    mobile_object.images['url1'] = document.querySelector('.specs-photo-main img').getAttribute('src');
 // console.log(mobile_object.camera_pixel = document.querySelector('.help-camera .accent').children[0].innerText + '' + document.querySelector('.help-camera .accent').children[1].innerText);
       if(document.querySelector('.help-camera .accent') != null)
       {
           if(document.querySelector('.help-camera .accent').children.length==2)
           {
               mobile_object.battery = document.querySelector('.help-camera .accent').children[0].innerText + '' + document.querySelector('.help-camera .accent').children[1].innerText;
           }
           else if(document.querySelector('.help-camera .accent').children.length==1)
           {
               mobile_object.battery = document.querySelector('.help-camera .accent').children[0].innerText ;
           }
           else
           {
               mobile_object.battery = "";
           }
       }

        console.log(mobile_object.video_pixel = document.querySelector('.help-camera .accent').nextElementSibling.innerText);
    console.log(mobile_object.ram = document.querySelector('.help-expansion .accent') != null ?
                document.querySelector('.help-expansion .accent').children[0] != null ?
                document.querySelector('.help-expansion .accent').children[0].innerText : '' + '' +
                document.querySelector('.help-expansion .accent').children[1] != null ?
                document.querySelector('.help-expansion .accent').children[1].innerText : '' : '');
    console.log(mobile_object.chipset = document.querySelector('.help-expansion .accent').nextElementSibling.innerText);


    if(document.querySelector('.help-battery .accent') != null)
{
    if(document.querySelector('.help-battery .accent').children.length>0)
    {
       mobile_object.battery = document.querySelector('.help-battery .accent').children[0].innerText + '' + document.querySelector('.help-battery .accent').children[1].innerText;
    }
    else
    {
       mobile_object.battery = "";
    }
}

    console.log(mobile_object.battery_capacity = document.querySelector('.help-battery .accent').nextElementSibling.innerText);
    console.log(mobile_object.spec_comment = document.querySelector('#specs-list p') != null ?
                document.querySelector('#specs-list p').innerText == null ? '' : document.querySelector('#specs-list p').innerText : '');

     let pointer = false;
    let swap = true;
    let first = null;
    let second = null;
    let listLength = $('#specs-list table tbody').length ;//;- $('#specs-list table tbody').length + 2;
for(let i = 0; i<listLength;i++)
{
    pointer = false;
    swap = true;
    for(let k of Array.from( $($($($('#specs-list table tbody'))[i]).find('tr td'))))
               {

                    if(!pointer)
                    {
                   console.log('in if',$(k).parent().find('th').text(),($(k)).text().trim(),($(k)).text().trim());
                        first = $(k).parent().find('th').text() != '' ? $(k).parent().find('th').text() : first;
                        second = ($(k)).text().trim();
                        first = stringy(first);
                        second = stringy(second)
                        mobile_object[first] = {};
                        mobile_object[first][second] = {};
                        console.log( JSON.parse(JSON.stringify(mobile_object)));
                    pointer = true;
                    }
                    else
                    {
                        console.log('in else');
                        if(swap)
                        {
                            console.log('in swap',($(k)).text().trim());
                            first = stringy(first);
                                            second = stringy(second)
                                                mobile_object[first][second] = {};
                        mobile_object[first][second] = (i,($(k)).text().trim());
                            swap = false;
                        }
                        else
                        {
                            console.log('in swap else',($(k)).text().trim());
                            second = (i,($(k)).text().trim());
                            swap = true;
                            console.log('ffffffff',second);
                            first = stringy(first);
                                            second = stringy(second)
                        }
                    }
               }

};
    // Your code here...
    localStorage.setItem('c',JSON.stringify(mobile_object));
//    fetch_images();
 //
    }

function fetch_images()
{
    if(document.querySelector('.article-info-meta-link a') && localStorage.getItem('single_mobile_page_pictures')== null)
    {
        if(document.querySelector('.article-info-meta-link a').innerText == "PICTURES")
        {
            localStorage.setItem('single_mobile_page_pictures',true);
            document.querySelector('.article-info-meta-link a').click();
        }
        else
        {
            setTimeout(()=>{
                console.log('there is no pictures for this mobile');
                setTimeout(()=>{localStorage.removeItem('single_mobile_page_pictures');localStorage.removeItem('single_mobile_page');window.close()},1000);
            },5000);
        }
    }
    else
    {
        setTimeout(()=>{
            console.log('waiting for pic to close');
               // setTimeout(()=>{localStorage.removeItem('single_mobile_page_pictures');localStorage.removeItem('single_mobile_page');window.close()},1000);
            fetch_images();
        },1000);
    }
}

    
    
    
start_fetch();

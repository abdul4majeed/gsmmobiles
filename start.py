from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import json
import time


options = Options()
# options.binary_location = "C:\\path\\to\\chrome.exe"    #chrome binary location specified here
options.add_argument("--start-maximized") #open Browser in maximized mode
options.add_argument("--no-sandbox") #bypass OS security model
options.add_argument("--disable-dev-shm-usage") #overcome limited resource problems
options.add_experimental_option("excludeSwitches", ["enable-automation"])
options.add_experimental_option('useAutomationExtension', False)
driver = webdriver.Chrome(options=options, executable_path=r'./chromedriver')

driver.get('https://www.gsmarena.com/makers.php3')


category = []
phones = []
filename = 'data.json'


def get_phones():
    phones_url = "return (function(){let cate = [] ; document.querySelectorAll('.makers a').forEach(function(i,e){cate.push('https://www.gsmarena.com/'+i.getAttribute('href'));}); return cate;})();"
    phones_url = driver.execute_script(phones_url)

    for phone in phones_url:
        phones.append(phone)

    print(phones,len(phones))
    while True:
        if driver.execute_script("return document.querySelector('.nav-pages strong').nextElementSibling"):
            driver.execute_script("return document.querySelector('.nav-pages strong').nextElementSibling.click()")
            get_phones()
        else:
            print('all phone end')
            break


def open_single_phone_page():

    while True:
        if len(phones) > 0:
            print(len(phones),'Opening')
            driver.get(phones.pop(0))
            get_info_pic_and_save_in_file()
            pass
        else:
            break

def get_info_pic_and_save_in_file():
    time.sleep(2)
    print('installing jquery')
    with open('jquery.js', errors='ignore') as f:
        driver.execute_script(f.read())
    print('installed jquery')
    print('getting information')
    with open('get_information.js', errors='ignore') as f:
        driver.execute_script(f.read())
    print('getted information')
    time.sleep(3)
    print('getting pictures')
    if driver.execute_script(" return document.querySelector('.article-info-meta-link a i.icon-pictures')"):
        driver.get('https://www.gsmarena.com/'+driver.execute_script(" return document.querySelector('.article-info-meta-link a i.icon-pictures').parentElement.getAttribute('href');"))
        with open('pictures.js', errors='ignore') as f:
            driver.execute_script(f.read())
    print('getted pictures')
    time.sleep(1)

    data = (driver.execute_script("return JSON.parse(localStorage.getItem('c'))"))
    
    
    with open(filename, 'a') as outfile:
        json.dump(data, outfile)
    with open(filename, 'a') as outfile:
        outfile.write(',')
def main():
    with open(filename, 'w') as outfile:
        outfile.write('[')
    # Get Main Brands From the First Page
    category = "return (function(){let cate = [] ; document.querySelectorAll('.st-text a').forEach(function(i,e){cate.push('https://www.gsmarena.com/'+i.getAttribute('href'));}); return cate;})();"
    category = driver.execute_script(category)

    print(len(category))

    i = 116

    while i > 1:
        category.pop()
        i = i -1

    print(len(category),category)

    # If Brands array is not 0 pop the url and 
    # 1. Get the pages until pagination is not emptyed
    # 2. Open the Single Page Mobile
    # 3. Get the information from the single page
    while True:
        
        if len(category) <= 0:
            print('end')
            break
        else:
            driver.get(category.pop(0))
            get_phones()
            open_single_phone_page()
            print('pop')


main()
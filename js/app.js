const loadPhones= async (searchText,dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data,dataLimit);

}

const displayPhones = (phones,dataLimit) =>{

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    const showAllData = document.getElementById('show-all-data');

    if(dataLimit && phones.length > 10){
        phones = phones.slice(0,10);
        showAllData.classList.remove('d-none');
    }
    else{
        showAllData.classList.add('d-none');
    }

//display none

const noItem = document.getElementById("no-item");
if(phones.length === 0){
    noItem.classList.remove('d-none');

}
else{
    noItem.classList.add('d-none');
}
    // display phones


    phones.forEach(phone =>{
        
       const phoneDiv = document.createElement('div');
       phoneDiv.classList.add('col');
       phoneDiv.innerHTML = `
       
       <div class="card h-100">
         <img src="${phone.image}" class="card-img-top w-50 mx-auto pt-3 " alt="...">
         <div class="card-body p-5">
           <h5 class="card-title">Brand:${phone.brand}</h5>
           <p class="card-text">Model: ${phone.phone_name}</p>
           <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, impedit?</p>
           <button onclick = "loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phone-detail-modal">Show Details</button>

         </div>
       </div>
    
       `;
       phoneContainer.appendChild(phoneDiv);
    });
    toggleSpinner(false);
}


const processData = (dataLimit) =>{
    toggleSpinner(true);
    const searchText = document.getElementById('search-input').value;
   loadPhones(searchText, dataLimit);
  
}

document.getElementById('btn-search').addEventListener('click',function(){
    processData(10);
})
document.getElementById('search-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        processData(10);
    }
});

// document.getElementById('search-input').value = '';


const toggleSpinner = isLoading =>{
    const loadSpinner = document.getElementById('spinner');
    if(isLoading){
    loadSpinner.classList.remove('d-none');

    }
    else{
    loadSpinner.classList.add('d-none');
    }
    


} 



document.getElementById('show-all').addEventListener('click',function(){
    processData();
})

const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}
const displayPhoneDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const modalBody = document.getElementById('modal-body-detail');
    modalBody.innerHTML= `
    <p>Released in: ${phone.releaseDate ? phone.releaseDate : 'no released date found'}</p>
    <p>Bluetooth: ${phone.others.Bluetooth ? phone.others.Bluetooth : 'no bluetooth found'}</p>
    <p>Memory: ${phone.mainFeatures.memory ? phone.mainFeatures
                .memory : 'nothing to show'}</p>
    
    `

}

// loadPhones('apple')
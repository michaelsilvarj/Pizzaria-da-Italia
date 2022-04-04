let modalQt = 1;
let cart = [];
let modalKey = 0;

//Encurtador função document .querySelector
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

//Mapeia a lista pizza
pizzaJson.map((item,index)=>{
    //Clona a model
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    pizzaItem.setAttribute('data-key',index);
    pizzaItem.querySelector('.pizza-item--img img').src= item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML =`${item.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`;
    //pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}` ;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name ;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click',(e)=>{
        e.preventDefault();

            //seta o item mais proximo de pizza-item
            let key = e.target.closest('.pizza-item').getAttribute('data-key');
            modalQt=1;
            modalKey = key;

            c('.pizzaBig img').src = pizzaJson[key].img;
            c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
            c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
            c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
            c('.pizzaInfo--size.selected').classList.remove('selected');
            cs('.pizzaInfo--size').forEach((size,SizeIndex)=>{
                if(SizeIndex == 2){
                    size.classList.add('selected');
                }
                
                size.querySelector('span').innerHTML = pizzaJson[key].sizes[SizeIndex];

            });
            
            c('.pizzaInfo--qt').innerHTML = modalQt;
            c('.pizzaWindowArea').style.opacity=0;
            c('.pizzaWindowArea').style.display='flex';
            
            setTimeout(()=>{
                c('.pizzaWindowArea').style.opacity=1;
            },200);

        });
       

    // Adiciona elemento
    c('.pizza-area').append(pizzaItem);


});


//Eventos Modal
function closeModal(){
    c('.pizzaWindowArea').style.opacity=0;
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none';
    },500);
}
cs('.pizzaInfo--cancelMobileButton,.pizzaInfo--cancelButton').forEach ((item)=>{
    item.addEventListener('click',closeModal);
}); 

//Função do modal que adiciona e retira quantidade de pizza
c('.pizzaInfo--qtmais').addEventListener('click',()=>{
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;

});
c('.pizzaInfo--qtmenos').addEventListener('click',()=>{
    if( modalQt>1){
        modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt;
    }
});

//Seleciona Tamanho pizza
cs('.pizzaInfo--size').forEach((size,SizeIndex)=>{
    size.addEventListener('click', (e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        //seleciona o proprio item ao clicar
        size.classList.add('selected');

      
    });
});



//Reune as informações no carrinho
c('.pizzaInfo--addButton').addEventListener('click',()=>{

    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));

    //identifica o tamanho e o sabor são os mesmos
    let identifier = pizzaJson[modalKey].id+'@'+size;
    let key = cart.findIndex((item)=>item.identifier == identifier);
    //controla quantidade comprada
    if(key>-1){
        cart[key].qt += modalQt;
    }else{
        cart.push({
            identifier,
            id:pizzaJson[modalKey].id,
            size,
            qt:modalQt,
        });
    }
    updateCart();
    closeModal();
});

// Atualiza carrinho
function updateCart(){
    if(cart.length>0){
        c('aside').classList.indexadd('show');
        for (let i in cart) {
           let pizzaItem = pizzaJson.find((item)=>{item.id == cart[i].id});
            
        }
    }else{
        c('aside').classList.remove('show');
    }
}
            
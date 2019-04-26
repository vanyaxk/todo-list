document.addEventListener("DOMContentLoaded", function () {

    const addItems = document.querySelector('.add-items');
    const itemsList = document.querySelector('.plates');
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const checkAll = document.querySelector("#checkAll");
    const uncheckAll = document.querySelector("#uncheckAll");
    const deleteAll = document.querySelector('#deleteAll');
    function addItem(e) {
        e.preventDefault();
        const text = (this.querySelector('[name=item]')).value;

        const item = {
            text,
            done: false
        }


        items.push(item) //putting an item object into the items array
        populateList(items, itemsList);
        localStorage.setItem('items', JSON.stringify(items));
         //forms have a reset method that clears values
        this.reset();
    }

    function populateList(plates = [], platesList) { //basically items array and and itemsList constant, but parameters are defined to make the function more independent
        platesList.innerHTML = plates.map((plate, index) => {
            return `
            <li>
                <input type="checkbox" data-index=${index} id="item${index}" ${plate.done ? 'checked': ''}>
                <label for="item${index}">${plate.text}</label>
            </li>
            `
        }).join(''); //join takes the array that map method makes and converts it into a big string
    }

    function toggleDone(e) {
        const el = e.target;
        const index = el.dataset.index;
        if (!el.matches('input')) return;
        

        items[index].done = !items[index].done;
        localStorage.setItem('items', JSON.stringify(items))
        populateList(items, itemsList);

    }

    function checkDone() {
        items.forEach(item => item.done = true);
        localStorage.setItem('items', JSON.stringify(items));
        populateList(items, itemsList);
    }
    function uncheckDone() {
        items.forEach(item => item.done = false);
        localStorage.setItem('items', JSON.stringify(items));
        populateList(items, itemsList);
    }

    function deleteDone() {
        items.length = 0;
        localStorage.setItem('items', JSON.stringify(items));
        populateList(items, itemsList);
    }
    
    
    addItems.addEventListener("submit", addItem);
    itemsList.addEventListener('click', toggleDone);
    checkAll.addEventListener("click", checkDone);
    uncheckAll.addEventListener("click", uncheckDone);
    deleteAll.addEventListener("click", deleteDone);
    populateList(items, itemsList);
})
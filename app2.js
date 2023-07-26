var box = document.querySelector(".boxx");
  document.getElementById('addForm').addEventListener('submit', addele);
  window.addEventListener('DOMContentLoaded', () => {
    pageloader();
  })
  async function pageloader() {
    const result = await axios.get('http://localhost:3000/')
    await console.log(result.data);
    result.data.forEach(element => {
      var div = document.createElement('div');
      var h1 = document.createElement('h1');
      var delbtn = document.createElement('input');
      delbtn.type = 'button'
      delbtn.value = "Delete"
      var editbtn = document.createElement('input');
      editbtn.type = 'button'
      editbtn.value = "Edit"
      var idstore = document.createElement('input');
      idstore.value = element.id
      idstore.type = 'hidden'
      var amtstore = document.createElement('input');
      amtstore.value = element.amount
      amtstore.type = 'hidden'
      var disstorer = document.createElement('input');
      disstorer.value = element.description
      disstorer.type = 'hidden'
      var catestorer = document.createElement('input');
      catestorer.value = element.category
      catestorer.type = 'hidden'
      h1.innerHTML = 'Amount-' + element.amount + '  Description-' + element.description + '  Category-' + element.category;
      box.appendChild(div);
      div.appendChild(idstore);
      div.appendChild(amtstore);
      div.appendChild(disstorer);
      div.appendChild(catestorer);
      div.appendChild(h1);
      div.appendChild(delbtn);
      div.appendChild(editbtn);

      editbtn.addEventListener('click', editf);
      delbtn.addEventListener('click', delf);
    });
  }
  async function addele(e) {
    var amou = document.getElementById('amt').value;
    var descr = document.getElementById('desc').value;
    var catego = document.getElementById('categ').value;
    const config = {
      method: 'POST',
      url: 'http://localhost:3000/add',
      data: {
        "amt": amou,
        "des": descr,
        "cat": catego
      }
    }
    await axios(config).then(()=>{console.log("added")}).catch((err)=>{console.log(err)});
    await delall();
    await pageloader();

  }
  async function delall() {
    return new Promise((resolve, reject) => {
      while (box.firstChild) {
        box.removeChild(box.firstChild);
      }
      resolve()
    })
  }
  async function editf(e) {
    var par = e.target.parentElement;
    var amount= par.children[1];
    var description=par.children[2];
    var category=par.children[3];
    var amou = document.getElementById('amt');
    var descr = document.getElementById('desc');
    var catego = document.getElementById('categ');
    amou.value=amount.value
    descr.value=description.value
    catego.value=category.value
  }
  async function delf(e) {
    var par = e.target.parentElement;
    var fc = par.firstChild;
    var id = fc.value
    await axios.get("http://localhost:3000/del/" + id).then(()=>{console.log("deleted")}).catch((err)=>{console.log(err)});
    await delall();
    await pageloader();
  }
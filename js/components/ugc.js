//UCG Code
(function (d, id) { 
  var t, el = d.scripts[d.scripts.length - 1].previousElementSibling; 
  if (el) el.dataset.initTimestamp = (new Date()).getTime(); 
  if (d.getElementById(id)) return; 
  t = d.createElement('script');
  const article = document.querySelector('.stackla-widget');
  if(article != undefined || null)
  {
  const url = article.dataset.stacklacdn;
  t.src =url;
  t.id = id; 
  (d.getElementsByTagName('head')[0] || d.getElementsByTagName('body')[0]).appendChild(t);
  } 
}(document, 'stackla-widget-js'));

//model-popup
(((d) => {
  const t = d.createElement('script');
  t.type = 'text/javascript';
  const model = document.querySelector('#stackla-goconnect-widget');
  if(model != undefined || null){
      const popUpurl = model.dataset.modelurl;
      t.src = popUpurl; 
      console.log(t.src);
  }
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(t);
  })(document))
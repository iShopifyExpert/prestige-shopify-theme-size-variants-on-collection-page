$(document).on('click', '.ProductItem__SizeSwatchList .ProductItem__SizeSwatchItem:not(.disabled)', function() {
  var SizeId = $(this).find('.SizeSwatch__Radio').attr("data-id");
  addItemToCart(SizeId, 1);
});

function addItemToCart(variant_id, qty) {
  var data = { "id": variant_id, "quantity": qty };
  document.dispatchEvent(new CustomEvent('theme:loading:start'));

  $.ajax({
    type: 'POST',
    url: '/cart/add.js',
    data: data,
    dataType: 'json',
    success: function() { 
      document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
        bubbles: true
      }));
      document.dispatchEvent(new CustomEvent('theme:loading:end'));
      openCartDrawer();
    },
    error: function(e) {
      document.dispatchEvent(new CustomEvent('theme:loading:end'));
      alert(e.responseJSON.description);
    }
  });
}

function openCartDrawer() {
  document.querySelector('.Header__Icon[data-drawer-id="sidebar-cart"]').click();
}

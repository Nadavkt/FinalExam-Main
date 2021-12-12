      /* Set the width of the side navigation to 250px */
      //   function openNav() {
      //       document.getElementById("mySidenav").style.width = "100%";
      //       document.getElementById("effect").style.paddingRight = "250px";
      //       document.getElementById("effect").style.transition = ".5s";
      //   }

      function openNav() {
          document.getElementById("mySidenav").classList.add("open");
      }

      /* Set the width of the side navigation to 0 */
      //   function closeNav() {
      //       document.getElementById("mySidenav").style.width = "0";
      //       document.getElementById("effect").style.transition = ".5s";
      //       document.getElementById("effect").style.paddingRight = "0";

      //   }

      function closeNav() {
          document.getElementById("mySidenav").classList.remove("open");
      }

      // Hamburger Menu Code

      //   let windowMedia = window.matchMedia("(min-width: 1025px");
      //   // Opening & Closing cart functions
      //   function openCart() {
      //       if (windowMedia.matches) {
      //           document.getElementById("myCartOpening").style.width = "30%";
      //           document.getElementById("effect").style.paddingRight = "250px";
      //           document.getElementById("effect").style.transition = ".5s";
      //       }
      //       else{
      //         document.getElementById("myCartOpening").style.width = "100%";
      //         document.getElementById("effect").style.paddingRight = "250px";
      //         document.getElementById("effect").style.transition = ".5s";
      //       }
      //   }

      function openCart() {
          document.getElementById("myCartOpening").classList.add("open");
      }



      /* Set the width of the side navigation to 0 */
      //   function closeCart() {
      //       document.getElementById("myCartOpening").style.width = "0";
      //       document.getElementById("effect").style.transition = ".5s";
      //       document.getElementById("effect").style.paddingRight = "0";
      //   }

      function closeCart() {
          document.getElementById("myCartOpening").classList.remove("open");
      }

      let totalPrice = 0;
      let myCartCount = 0;

      function ModifyAddCart(indexOfItem) {
          cart[indexOfItem].quantity = parseInt(cart[indexOfItem].quantity) + 1;
          cart.splice(indexOfItem, 1, cart[indexOfItem]);
          localStorage.setItem("cart", JSON.stringify(cart));
          refreshCart();

      }

      function ModifyDecreaseCart(indexOfItem) {
          if (cart[indexOfItem].quantity <= 1) {
              cart.splice(indexOfItem, 1);
              localStorage.setItem("cart", JSON.stringify(cart));
          } else {
              cart[indexOfItem].quantity = parseInt(cart[indexOfItem].quantity) + -1;
              cart.splice(indexOfItem, 1, cart[indexOfItem]);
              localStorage.setItem("cart", JSON.stringify(cart));
          }

          // if(cart.length == 0){
          //     localStorage.clear();
          // }

          refreshCart();

      }

      function displayMyTableCartPage(){
          let storedItems = JSON.parse(localStorage.getItem("cart"));
          let display = "";

          if (storedItems != null) {
            cart = storedItems;
            storedItems.forEach(item => {
        
                display += `<li class="table-header"> 
                <div class="col col-1"> ` + item.name +`  </div>
                <div class="col col-2">` + ` <a href="javascript:" class="removeProduct circular" onclick="ModifyAddCart( `+ cart.indexOf(item) +` )"><i class="fa fa-plus" aria-hidden="true"></i></a> ` +  item.quantity +` <a href="javascript:" class="removeProduct circular" onclick="ModifyDecreaseCart( `+ cart.indexOf(item) +` )"><i class="fa fa-minus" aria-hidden="true"></i></a> </div>
                <div class="col col-3">`+ item.price * item.quantity + ` ` + item.currency +`</div>
                <div class="col col-4">`+ item.size +` <a class="removeProduct circular" onclick="onDeleteItem(` + cart.indexOf(item) + `)"><i class="fa fa-times" aria-hidden="true"></i></a> </div> </li>`;
            });
          }

          document.getElementById("myTable").innerHTML = '<ul class="responsive-table">' + `<li class="table-header">
          <div class="col col-1">Product Name</div>
          <div class="col col-2">Product Quantity</div>
          <div class="col col-3">Product Price</div>
          <div class="col col-4">Product Size</div>
          </li> ` + display + '</ul>';

          document.getElementById("finalPriceCheckOut").innerHTML = "The total price is: " + totalPrice + `$`;
      }
      
      function refreshCart() {
          let storedItems = JSON.parse(localStorage.getItem("cart"));
          let display = "";

          if (storedItems != null) {
              cart = storedItems;
              storedItems.forEach(item => {

                  display += `<tr>
                  <td> <img class="round_image_cart" src="` + item.img + `"\></td>
                <td> ` + item.name + `</td> <td> ` + item.price * item.quantity + ` ` + item.currency + `</td> 
                <td><a href="javascript:" class="removeProduct circular" onclick="ModifyAddCart( `+ cart.indexOf(item) +` )"><i class="fa fa-plus" aria-hidden="true"></i></a> ` + item.quantity + ` <a href="javascript:" class="removeProduct circular" onclick="ModifyDecreaseCart( `+ cart.indexOf(item) +` )"><i class="fa fa-minus" aria-hidden="true"></i></a> </td>
                <td>Size: ` + item.size + `</td> <td><a href="javascript:" class="removeProduct" onclick="onDeleteItem(` + cart.indexOf(item) + `)"><i class="fa fa-times" aria-hidden="true"></i></a></td></tr>`;
                  // console.log(totalPrice);
              });

              myCartCount = cart.length;
              //   console.log(myCartCount);
          } else {
              myCartCount = "";
          }

          getFinalPrice();



          if (myCartCount != 0)
              if (myCartCount > 9)
                  cartCountID.innerHTML = ` 9+`;
              else
                  cartCountID.innerHTML = ` ${myCartCount}`;
          else
              cartCountID.innerHTML = "";

          document.getElementById("myCartOpeningContent").innerHTML = '<table>' + display + '</table>';
          displayMyTableCartPage();
      }

      
      function getFinalPrice() {
          let theFinalPrice = document.getElementById("finalPrice");
          //    console.log(theFinalPrice);
          totalPrice = 0;
          if (cart != null) {
              cart.forEach(item => {
                  totalPrice += item.price * item.quantity;
              });
          }

          if (totalPrice == 0) {
              theFinalPrice.innerHTML = 'Too Quiet Over Here...';
          } else
              theFinalPrice.innerHTML = "The total price is: " + totalPrice + `$`;

      }

      

      let cart = []; // Cart Array

      let saveColor = ''; // Saving my current clicked color

      function onClickSetColor(id) {
          //   console.log(id);
          saveColor = id; // Saving the color from the get method into the general variable saveColor
      }

      function onClickGetColor() {
          return saveColor; // Sending back the saved color from the first function
      }

      let saveSize = '';

      function onClickSetSize(mySize) {
          saveSize = mySize;
      }

      function onClickGetSize() {
          return saveSize;
      }


      let contains = false;
      // Adding items in the cart Array & inserting the count next to the cart icon.
      function onAddToCart(item) {
          if (item.color == "") {
              alert("No color has been selected !");
          } else if (item.size == "") {
              alert("No size has been selected !");
          } else if (item.quantity == 0) {
              alert("Please choose quantity");
          } else {

              if (cart.length == 0 || cart == undefined) {
                  cart.push(item);
                  localStorage.setItem("cart", JSON.stringify(cart));
                  alert("Product Added Succesfully To Cart");
              } else {

                  cart.forEach(cartItem => {
                      if (cartItem.name == item.name && cartItem.size == item.size && cartItem.color == item.color) {
                          cartItem.quantity = parseInt(cartItem.quantity) + parseInt(item.quantity);
                          localStorage.setItem("cart", JSON.stringify(cart));
                          contains = true;
                      }
                  });
                  if (!contains) {
                      cart.push(item);
                      localStorage.setItem("cart", JSON.stringify(cart));
                      alert("Product Added Succesfully To Cart");
                  }

                  contains = false;
              }
              refreshCart();
          }

      }

      let i = 0;

      function onDeleteItem(index) {
          cart.splice(index, 1);
          if (cart.length == 0) {
              localStorage.clear();
          } else
              localStorage.setItem("cart", JSON.stringify(cart));

          refreshCart();
      }


      let choosenColor = document.querySelectorAll(".color-choose div");

      function chooseMyColor(id) {
          choosenColor.forEach(item => {
              item.innerHTML = "";
              if (item.id == saveColor) {
                  item.innerHTML = "&#10003;";

                  if (saveColor == "black") {
                      document.getElementById("mainPicture").src = "more_shoes1.jpg";
                  } else if (saveColor == "red") {
                      document.getElementById("mainPicture").src = "myFoot1.jpg";
                  } else {
                      document.getElementById("mainPicture").src = "greenShoesNike.jpg";
                  }
              }

          });


          //   choosenColor.forEach(item => {
          //     item.classList.remove("selectedColor");
          //   });


          //   document.getElementById().classList.add("selectedColor");

          // document.getElementById().style.display = "block";
      }

      let master = document.getElementById("display-content");
      let linksMaster = document.querySelectorAll("#flex-Dis a");
      let displayMaster = document.querySelectorAll("#display-content div");


      let peopleComments = [];

      function deskOpen(path) {

          displayMaster.forEach(item => {
              item.style.display = "none";
          });

          linksMaster.forEach(item => {
              item.classList.remove("active");
          });


          document.getElementById(path).style.display = "block";
          document.getElementById(path + "-button").classList.add("active");

          linksMaster.forEach(element => {
              scrollToTop();
          });

          if (path == "rev-zone") {
              peopleComments = JSON.parse(localStorage.getItem("Comments"));

              if (peopleComments) { // different from null and undifined
                  spanRevZone.innerHTML = null;
                  peopleComments.forEach(comment => {
                      spanRevZone.innerHTML +=
                          "<span>" + comment.Name + ": " + comment.Comment + "</span>"
                  });


              }
          }
      }

      let spanRevZone = document.getElementById("myComments");

      let windowResolution = window.matchMedia("(max-width: 700px)");

      function scrollToTop() {
          if (windowResolution.matches) {
              window.scrollTo({
                  top: 1000,
                  behavior: 'smooth'
              });
          } else {
              window.scrollTo({
                  top: 1370,
                  behavior: 'smooth'
              });
          }
      }


      $(function () {
          $('#WAButton').floatingWhatsApp({
              phone: '+972547519653', //WhatsApp Business phone number International format-
              //Get it with Toky at https://toky.co/en/features/whatsapp.
              headerTitle: 'Chat with us on WhatsApp!', //Popup Title
              popupMessage: 'Hello, how can we help you?', //Popup Message
              showPopup: true, //Enables popup display
              buttonImage: '<img src="https://rawcdn.githack.com/rafaelbotazini/floating-whatsapp/3d18b26d5c7d430a1ab0b664f8ca6b69014aed68/whatsapp.svg" />', //Button Image
              //headerColor: 'crimson', //Custom header color
              //backgroundColor: 'crimson', //Custom background button color
              position: "right"
          });
      });





      function SubmitComment(Comment) {
          if (!peopleComments) {
              peopleComments = [];
          }
          if (Comment.Name == "") {
              alert("No Name Has Been Choosen !");
          } else if (Comment.Comment == "") {
              alert("No Comment Has Been Inserted !");
          } else {
              peopleComments.push(Comment);
              localStorage.setItem("Comments", JSON.stringify(peopleComments));

              if (peopleComments) { // different from null and undifined
                  spanRevZone.innerHTML = null;
                  peopleComments.forEach(comment => {
                      spanRevZone.innerHTML +=
                          "<span>" + comment.Name + ": " + comment.Comment + "</span>"
                  });
              }
          }

      }
      let productQ = document.getElementById("product-quantity");
      let displayedProductPage = document.getElementById("productPrice");
      let myOriginalPriceProduct = document.getElementById("original_price_number");
    //   let metaDataPriceValue = document.getElementById("productPrice").getAttribute("meta-value");

      function AddProductQuantity() {
          productQ.innerHTML = parseInt(productQ.innerHTML) + 1;
          displayedProductPage.innerHTML = parseInt(productQ.innerHTML) * parseInt(myOriginalPriceProduct.innerHTML);

      }

      function DecreaseProductQuantity() {
          if (parseInt(productQ.innerHTML) <= 1) {
              productQ.innerHTML = 1;
          } else
              productQ.innerHTML = parseInt(productQ.innerHTML) - 1;

              displayedProductPage.innerHTML = parseInt(productQ.innerHTML) * parseInt(myOriginalPriceProduct.innerHTML);
      }
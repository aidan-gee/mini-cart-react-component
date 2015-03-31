/*
* Mini Cart UI Component
*/

var MiniCart = React.createClass({
    getInitialState: function(){
      return {
        cart : {
          items:[{productName: "Test 1", image: "http://placehold.it/55x70", sku:"000001", size:5, quantity:1},
          {productName: "Test 2", image: "http://placehold.it/55x70", sku:"000002", size:2, quantity:2}],
          totalPrice: 60
        },
        miniCartDropdownIsVisible: false
      }
    },
  showMiniCartDropdown: function(){
    if (this.state.cart.items.length){
      this.setState({
          miniCartDropdownIsVisible : true
      });
    }
  },
  hideMiniCartDropdown: function(){
    this.setState({
          miniCartDropdownIsVisible : false
    });
  },
  goToCheckout: function(){
    window.location = this.props.checkoutUrl;
  },
  increaseQuantity: function(item){
    // make api request on response update quantity 
    // for now just ++ 
    var items = this.state.cart.items;
    var totalPrice = this.state.cart.totalPrice;
    for (var i = items.length - 1; i >= 0; i--) {
      if (items[i] == item){
        items[i].quantity++;
        this.setState({
          cart : {
            items: items,
            totalPrice: totalPrice
          }
        });
      }
    }
  },
  decreaseQuantity: function(item){
    // make api request on response update quantity 
    // for now just -- 
    var items = this.state.cart.items;
    var totalPrice = this.state.cart.totalPrice;
    // search for item in state 
    // decrease the quantity or remove the item
    for (var i = items.length - 1; i >= 0; i--) {
      if (items[i] == item){
        if(items[i].quantity > 1){
          items[i].quantity--;
          this.setState({
            cart : {
              items: items,
              totalPrice: totalPrice
            }
          });
        return;
        }
        else if (items[i].quantity == 1){
          // remove item
          items.splice(i , 1);
          this.setState({
            cart : {
              items: items,
              totalPrice: totalPrice
            }
          });
        }
      }
    }
  },
  render: function(){
    return(
      <div onMouseEnter={this.showMiniCartDropdown} onMouseLeave={this.hideMiniCartDropdown} className="miniCart clearfix">
        <MiniCartDetails items={this.state.cart.items} price={this.state.cart.totalPrice}/>
        <button onClick={this.state.goToCheckout}>Checkout</button>
        <MiniCartDropdown items={this.state.cart.items} 
        increaseQuantity={this.increaseQuantity} 
        decreaseQuantity={this.decreaseQuantity} 
        visible={this.state.miniCartDropdownIsVisible} 
        goToCheckout={this.goToCheckout}
        price={this.state.cart.totalPrice} />
      </div>
    )
  }
});

var MiniCartDetails = React.createClass({

  render: function(){
    var items;
    if (typeof this.props.items.length !== 'undefined' && this.props.items.length !== 0){
      items = <span>{this.props.items.length} items</span>;
    } 
    else items = <span>Cart empty</span>;

    var price;
    if (typeof this.props.price !== 'undefined' && this.props.price !== 0){
      price = <span>£{this.props.price}</span>;
    }
  
    return(
      <div>{items} {price}</div>
    )
  }
});

/*
* Mini Cart dropdown 
*/

// Renders the entire minicart dropdown
var MiniCartDropdown = React.createClass({
  render: function(){
    var basketItems = this.props.items.map(function(item){
      return <MiniCartDropdownBasketRow item={item} increaseQuantity={this.props.increaseQuantity} decreaseQuantity={this.props.decreaseQuantity}/>
    }.bind(this));
    //pass in, inline styles as an object literal
    var inlineStyles = {
      display: this.props.visible ? 'block':'none'
    };

    return(
      <div style={inlineStyles} className="miniCartDropdown">
        <ul>
          {basketItems}
        </ul>
        <MiniCartDropdownBasketTotals price={this.props.price}/>
        <button onClick={this.props.goToCheckout}>Checkout</button>
      </div>
    )
  }

});

// Creates a row for each item in the basket 
var MiniCartDropdownBasketRow = React.createClass({
  increaseQuantity: function(){
    this.props.increaseQuantity(this.props.item);
  },
  decreaseQuantity: function(){
    this.props.decreaseQuantity(this.props.item);
  },
  render: function(){
    //pass in, inline styles as an object literal
    var inline = {
      display: "inline-block"
    };
    return(
      <li className="miniCartDropdownBasketRow">
        <img src={this.props.item.image}/>
        <div className="itemInfo">
          <p>{this.props.item.productName}</p>
          <p>code: {this.props.item.sku}</p>
          <p><strong>size</strong>:{this.props.item.size}</p>
        </div>
        <div className="rowQuantity">
          <button onClick={this.increaseQuantity}>+</button>
          <span>{this.props.item.quantity}</span>
          <button onClick={this.decreaseQuantity}>-</button>
        </div>
        <div>
          {this.props.item.subtotal}
        </div>
      </li>
    )
  }

});

// All the totals for the basket
var MiniCartDropdownBasketTotals = React.createClass({
  render: function(){
    console.log(this.props.price);
    return(
      <div className="basketTotals">
        Total : £{this.props.price}
      </div>
    )
  }

});


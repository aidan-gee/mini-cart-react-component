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
    toggleMiniCart: function(){
      var current = this.state.isVisible;
      this.setState({
        isVisible : !current
    });
  },
  toggleMiniCartDropdown: function(){
    this.setState({
          miniCartDropdownIsVisible : !this.state.miniCartDropdownIsVisible
    });
  },
  goToCheckout: function(){
    window.location = this.props.checkoutUrl;
  },
  increaseQuantity: function(item){
    console.log("increase");
  },
  decreaseQuantity: function(item){
    console.log("decrease");
  },
  render: function(){
  
    var price = function(){
      if (this.state.cart.items.length > 0){
        console.log(this.state.cart.totalPrice);
        return <span> {this.state.cart.totalPrice}</span>;
      }
    }

    return(
      <div onMouseEnter={this.toggleMiniCartDropdown} onMouseLeave={this.toggleMiniCartDropdown} className="miniCart">
        <div>{this.state.cart.items.length} items {price}</div>
        <button onClick={this.state.goToCheckout}>Checkout</button>
        <MiniCartDropdown items={this.state.cart.items} increaseQuantity={this.increaseQuantity} decreaseQuantity={this.decreaseQuantity} visible={this.state.miniCartDropdownIsVisible}/>
      </div>
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
        <MiniCartDropdownBasketTotals />
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
    console.log(this.props);
    //pass in, inline styles as an object literal
    var inline = {
      display: "inline-block"
    };
    return(
      <li className="miniCartDropdownBasketRow">
        <img src={this.props.item.image}/>
        <div>
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
    return(
      <div>
       
      </div>
    )
  }

});


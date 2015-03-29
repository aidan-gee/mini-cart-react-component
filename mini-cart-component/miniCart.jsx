/*
* Mini Cart UI Component
*/

var MiniCart = React.createClass({
    getInitialState: function(){
      return {
        cart : {
          items:[{},{}],
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
  render: function(){

    var price = function(){
      if (this.state.cart.items.length > 0){
        console.log(this.state.cart.totalPrice);
        return <span> {this.state.cart.totalPrice}</span>;
      }
    }

    return(
      <div onMouseEnter={this.toggleMiniCartDropdown} onMouseLeave={this.toggleMiniCartDropdown}>
        <div>{this.state.cart.items.length} {price}</div>
        <MiniCartDropdown items={this.state.cart.items} visible={this.state.miniCartDropdownIsVisible}></MiniCartDropdown>
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
      return <MiniCartDropdownBasketRow item={item}/>
    }.bind(this));

     //pass in, inline styles as an object literal
    var inlineStyles = {
      display: this.props.visible ? 'block':'none'
    };

    return(
      <div style={inlineStyles}>
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
  render: function(){
    return(
      <li>
        <div>
          <img src={this.props.item.image} />
          <p>{this.props.item.productName}</p>
          <p>code: {this.props.item.sku}</p>
          <p><strong>size</strong>:{this.props.item.size}</p>
        </div>
        <div>
          <a>+</a>
          <span>{this.props.item.quantity}</span>
          <a>-</a>
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


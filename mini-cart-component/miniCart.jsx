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
  render: function(){

    var price = function(){
      if (this.state.cart.items.length > 0){
        console.log(this.state.cart.totalPrice);
        return <span> {this.state.cart.totalPrice}</span>;
      }
    }

    return(
      <div>
        <div>{this.state.cart.items.length} {price}</div>
        <MiniCartDropdown items={this.state.cart.items}></MiniCartDropdown>
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

    return(
      <div>
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


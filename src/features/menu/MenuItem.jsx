import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, getCurrentitembyId } from '../cart/cartSlice';
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const dispatch = useDispatch();

  const CurrentId = useSelector(getCurrentitembyId(id));

  function handleAddItem() {
    const newItemAdd = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice,
    };
    dispatch(addItem(newItemAdd));
    // console.log('+1');
  }

  return (
    <li className="my-2 flex gap-4">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="mt-0.5 flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {CurrentId > 0 && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity quantity={CurrentId} pizzaId={id} />

              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !(CurrentId > 0) && (
            <Button onClick={() => handleAddItem()} type="small">
              Add to cart
            </Button>
          )}
          {/* <button onClick={() => handleAddItem()}>add</button> */}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;

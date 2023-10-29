"use client";
import { useEffect, useState } from "react";
import { FormBlockWrapper } from "./formUtils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Plus, Trash2 } from "lucide-react";
import { calculateTotalPrice } from "@/utils/calculate-total-price";

interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const AddInvoiceItems = () => {
  const [discount, setDiscount] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [items, setItems] = useState<Item[]>([]);
  const [formCount, setFormCount] = useState(1);

  useEffect(() => {
    addForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addForm = () => {
    setItems([
      ...items,
      {
        id: new Date().getTime(),
        name: "",
        price: 0,
        quantity: 1,
      },
    ]);
    setFormCount(formCount + 1);
  };

  const removeForm = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
    setFormCount(formCount - 1);
  };

  const handleItemNameChange = (id: number, name: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, name } : item))
    );
  };

  const handleItemPriceChange = (id: number, price: number) => {
    if (price >= 0) {
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, price } : item))
      );
    }
  };

  const handleItemQuantityChange = (id: number, quantity: number) => {
    if (quantity >= 1) {
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const calculateSubTotal = () => {
    let subTotal = 0;
    items.forEach((item) => {
      subTotal += item.price * item.quantity;
    });
    return subTotal;
  };

  const subtotal = calculateSubTotal();

  return (
    <FormBlockWrapper
      title={"Item Details:"}
      description={"Add one or multiple item"}
      className="pt-7 2xl:pt-9 3xl:pt-11"
    >
      <div className="col-span-2">
        {items.map((item) => (
          <div key={item.id}>
            <div className="mb-8 rounded-lg border border-gray-200  p-4 shadow md:p-5 xl:p-6">
              <div className=" grid grid-cols-3 gap-4 ">
                <div className="col-span-1 w-full max-w-sm items-center gap-1.5 ">
                  <Label htmlFor="text">Item</Label>
                  <Input
                    type="text"
                    id="item"
                    placeholder="Enter item name"
                    value={item.name}
                    onChange={(e) =>
                      handleItemNameChange(item.id, e.target.value)
                    }
                  />
                </div>
                <div className="col-span-1 w-full max-w-sm items-center justify-between gap-1.5">
                  <Label htmlFor="number">Price</Label>
                  <Input
                    type="number"
                    prefix={"$"}
                    id="price"
                    placeholder="100"
                    value={item.price !== null ? item.price.toString() : ""}
                    onChange={(e) =>
                      handleItemPriceChange(item.id, parseFloat(e.target.value))
                    }
                  />
                </div>
                <div className="col-span-1 flex items-center w-full gap-4 max-w-sm mt-1 ">
                  <div className="grid w-full max-w-sm items-center justify-between gap-1.5">
                    <Label htmlFor="number">Quantity</Label>
                    <Input
                      type="number"
                      id="quantity"
                      placeholder="1"
                      value={
                        item.quantity !== null ? item.quantity.toString() : ""
                      }
                      onChange={(e) =>
                        handleItemQuantityChange(
                          item.id,
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="flex items-start text-sm mt-2">
                    <p className="me-1 text-gray-500">Total:</p>
                    <span className="font-medium">
                      $
                      {item.price !== null && item.quantity !== null
                        ? item.price * item.quantity
                        : 0}
                    </span>
                  </div>
                </div>
                <div className="col-span-3 w-full mt-4">
                  <Label htmlFor="message">Your message</Label>
                  <Textarea
                    placeholder="Type your message here."
                    id="message"
                    className="h-20"
                  />
                </div>
              </div>
              <Button
                variant="link"
                className="flex -mx-2 -mb-1 ms-auto mt-5 h-auto px-2 py-1 font-semibold text-red-500 justify-end"
                onClick={() => removeForm(item.id)}
              >
                <Trash2 className="me-1 h-[18px] w-[18px]" />
                Remove
              </Button>
            </div>
          </div>
        ))}

        {formCount > 0 && (
          <Button
            variant="secondary"
            onClick={addForm}
            className="-mt-2 mb-7 w-full 4xl:mb-0 4xl:mt-0 4xl:w-auto"
          >
            <Plus className="me-1.5 h-4 w-4" />
            Add Item
          </Button>
        )}

        <div className="flex w-full flex-col items-start justify-between 4xl:flex-row 4xl:pt-6">
          <div className="grid  w-full gap-2 4xl:w-auto">
            <div className="grid grid-cols-3 gap-3 lg:gap-4">
              <div className="col-span-1 w-full max-w-sm items-center justify-between gap-1.5"></div>
              <div className="col-span-1 w-full max-w-sm items-center justify-between gap-1.5">
                <Label htmlFor="number">Discount</Label>
                <Input
                  type="number"
                  id="quantity"
                  placeholder="15"
                  value={discount !== null ? discount.toString() : ""}
                  onChange={(e) => setDiscount(parseFloat(e.target.value))}
                />
              </div>
              <div className="col-span-1 w-full max-w-sm items-center justify-between gap-1.5">
                <Label htmlFor="number">Taxes %</Label>
                <Input
                  type="number"
                  id="quantity"
                  placeholder="50"
                  value={tax !== null ? tax.toString() : ""}
                  onChange={(e) => setTax(parseFloat(e.target.value))}
                />
              </div>
            </div>
            <div className="ms-auto mt-6 grid w-full gap-3.5 text-sm text-gray-600 dark:text-gray-400 xl:max-w-xs">
              <p className="flex items-center justify-between">
                Subtotal:{" "}
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  ${subtotal.toFixed(2)}
                </span>
              </p>
              <p className="flex items-center justify-between">
                Discount:{" "}
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {discount ? `$${discount.toFixed(2)}` : "--"}
                </span>
              </p>
              <p className="flex items-center justify-between">
                Taxes:{" "}
                <span className="font-medium text-red-500">
                  {tax ? `${tax.toFixed(2)}%` : "--"}
                </span>
              </p>
              <p className="flex items-center justify-between text-base font-semibold text-gray-900 dark:text-gray-50">
                Total:{" "}
                <span>
                  {calculateTotalPrice(subtotal, discount, tax)
                    ? `$${calculateTotalPrice(subtotal, discount, tax).toFixed(
                        2
                      )}`
                    : "$0.00"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </FormBlockWrapper>
  );
};

export default AddInvoiceItems;

const [checkedState, setCheckedState] = useState(
    new Array(currencies.length).fill(false)
  );

const handleOnChange = (index) => {
    setCheckedState(
        new Array(currencies.length).fill(false)
      );
}

const renderCurrency = (currency, index) => {
    return (
        <Form>
            <div key={`default-${currency}`} className="mb-3">
            <Form.Check
                className="currencyCheckBox"
                onChange={() => handleOnChange(index)}
                type='checkbox'
                checked={checkedState[index]}
                id={`default-${currency}`}
            />
            </div>
        </Form>
    )
}

// {currencies.map(renderCurrency)} 
-- Function to add funds to demo wallet
CREATE OR REPLACE FUNCTION add_demo_funds(wallet_id UUID, amount DECIMAL)
RETURNS VOID AS $$
BEGIN
  UPDATE demo_wallets 
  SET balance = balance + amount,
      updated_at = NOW()
  WHERE id = wallet_id;
END;
$$ LANGUAGE plpgsql;

-- Function to subtract funds from demo wallet
CREATE OR REPLACE FUNCTION subtract_demo_funds(wallet_id UUID, amount DECIMAL)
RETURNS VOID AS $$
BEGIN
  UPDATE demo_wallets 
  SET balance = balance - amount,
      updated_at = NOW()
  WHERE id = wallet_id AND balance >= amount;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient funds or wallet not found';
  END IF;
END;
$$ LANGUAGE plpgsql;

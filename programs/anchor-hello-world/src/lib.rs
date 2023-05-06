use anchor_lang::prelude::*;

declare_id!("7LULzYja5GZKq7Kcy6TgVCJYpHgFVyQmQ4c1FwZqVNMj");

#[program]
pub mod anchor_hello_world {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
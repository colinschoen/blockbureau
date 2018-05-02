pragma solidity ^0.4.0;
import "github.com/oraclize/ethereum-api/oraclizeAPI.sol";

contract BlockBureau is usingOraclize {
  uint public fb_friends_count;

  function get_fb_friends(string uid, string access_token) {
    oraclize_setNetwork(networkID_testnet);
    oraclize_setProof(proofType_TLSNotary | proofStorage_IPFS);
    oraclize_query("URL", strConcat("json(https://graph.facebook.com/v3.0/", uid, "/friends?access_token=", access_token, ").summary.total_count"));
  }
  
  // Allows light clients to react on a credit change
  event CreditUpdate(address user, string field, uint value);

  function __callback(bytes32 myid, string result, bytes proof) {
    if (msg.sender != oraclize_cbAddress()) throw;
    fb_friends_count = parseInt(result);
  }
}

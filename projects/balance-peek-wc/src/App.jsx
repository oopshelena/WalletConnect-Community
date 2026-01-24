import { useState } from "react";
import { EthereumProvider } from "@walletconnect/ethereum-provider";
import { ethers } from "ethers";

const projectId = import.meta.env.VITE_WC_PROJECT_ID;
const chains = [1, 137]; // Ethereum + Polygon

export default function App() {
  const [wcProvider, setWcProvider] = useState(null);
  const [status, setStatus] = useState("Not connected");
  const [address, setAddress] = useState("");
  const [chainId, setChainId] = useState("");
  const [balance, setBalance] = useState("");

  const fetchDetails = async (provider) => {
    const ethersProvider = new ethers.BrowserProvider(provider);
    const signer = await ethersProvider.getSigner();
    const addr = await signer.getAddress();
    const network = await ethersProvider.getNetwork();
    const bal = await ethersProvider.getBalance(addr);

    setAddress(addr);
    setChainId(network.chainId.toString());
    setBalance(Number(ethers.formatEther(bal)).toFixed(4));
  };

  const connect = async () => {
    try {
      if (!projectId) {
        alert("Missing Project ID in .env");
        return;
      }

      setStatus("Connecting...");

      const provider = await EthereumProvider.init({
        projectId,
        chains,
        showQrModal: true,
        methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"],
        events: ["chainChanged", "accountsChanged", "disconnect"],
      });

      await provider.connect();
      setWcProvider(provider);

      await fetchDetails(provider);
      setStatus("Connected ✅");

      provider.on("accountsChanged", async () => fetchDetails(provider));
      provider.on("chainChanged", async () => fetchDetails(provider));
      provider.on("disconnect", () => {
        setStatus("Disconnected");
        setAddress("");
        setChainId("");
        setBalance("");
        setWcProvider(null);
      });
    } catch (e) {
      console.log(e);
      setStatus("Connection failed ❌");
    }
  };

  const disconnect = async () => {
    if (wcProvider) await wcProvider.disconnect();
    setStatus("Disconnected");
    setAddress("");
    setChainId("");
    setBalance("");
    setWcProvider(null);
  };

  return (
    <div style={{ fontFamily: "Inter, system-ui", maxWidth: 820, margin: "0 auto", padding: 24 }}>
      <h1 style={{ marginBottom: 6 }}>Balance Peek WC 👀</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        A fun WalletConnect demo to connect a wallet and quickly peek address, chain, and balance.
      </p>

      <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
        {!address ? (
          <button
            onClick={connect}
            style={{ padding: "12px 16px", borderRadius: 12, cursor: "pointer", fontWeight: 600 }}
          >
            Connect Wallet
          </button>
        ) : (
          <button
            onClick={disconnect}
            style={{ padding: "12px 16px", borderRadius: 12, cursor: "pointer", fontWeight: 600 }}
          >
            Disconnect
          </button>
        )}

        <div style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid #eee" }}>
          <b>Status:</b> {status}
        </div>
      </div>

      <div style={{ marginTop: 18, padding: 16, borderRadius: 16, border: "1px solid #eee" }}>
        <p><b>Address:</b> {address || "—"}</p>
        <p><b>Chain ID:</b> {chainId || "—"}</p>
        <p><b>Balance:</b> {balance ? `${balance} ETH` : "—"}</p>
      </div>
    </div>
  );
}

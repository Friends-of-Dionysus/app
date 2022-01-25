import { ChevronRightIcon } from '@heroicons/react/solid'
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useMemo, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

const navigation = []

export default function WhitelistHero() {

    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [check, setCheck] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [running, setRunning] = useState(false)

    const wallet = useWallet();

    const anchorWallet = useMemo(() => {
        if (
            !wallet ||
            !wallet.publicKey ||
            !wallet.signAllTransactions ||
            !wallet.signTransaction
        ) {
            return;
        }

        return {
            publicKey: wallet.publicKey,
            signAllTransactions: wallet.signAllTransactions,
            signTransaction: wallet.signTransaction,
        }
    }, [wallet]);

    const handleTwitter = (e) => {
        setUsername(e.target.value)
    }

    const handleCheckbox = (e) => {
        setCheck(!check)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    async function onSubmit(e) {
        e.preventDefault()
        setError(null)
        setRunning(true)
        let address

        try {
            address = anchorWallet.publicKey.toString()
        } catch (err) {
            setRunning(false)
            return setError("Please connect your wallet first.")
        }

        if (!username || username.trim().length === 0) {

            setRunning(false)
            return setError("Please provide your Twitter handle.")
        }

        if (!check) {
            setRunning(false)
            return setError('Please agree to the privacy policy.')
        }

        const res = await fetch(`/api/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username.trim(),
                address: address,
                contact_permission: check,
                email: email
            })
        });


        if (res.status === 400) {
            setRunning(false)
            return setError((await res.json()).error)
        }

        if (res.status === 200) {
            setRunning(false)
            setSuccess(true)
        }


    }

    return (
        <div className="bg-fod-blue relative overflow-hidden">
            <div className="relative pt-12 sm:pb-24">

                <nav
                    className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
                    aria-label="Global"
                >
                    <div className="flex items-center flex-1">
                        <div className="flex items-center mx-auto justify-between w-full md:w-auto">
                            <a href="#">
                                <span className="sr-only">Workflow</span>
                                <img
                                    className="h-28 w-auto sm:h-48"
                                    src="/images/logo.png"
                                    alt=""
                                />
                            </a>
                        </div>
                    </div>
                </nav>

                <main className="mt-16 sm:mt-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                            <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                                <div>
                                    <a
                                        href="https://friendsofdionysus.com" target="_blank"
                                        className="inline-flex items-center text-white bg-gray-900 rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
                                    >
                                        <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-fod-red rounded-full">
                                            Learn more?
                                        </span>
                                        <span className="ml-4 text-sm">Visit our project page</span>
                                        <ChevronRightIcon className="ml-2 w-5 h-5 text-gray-500" aria-hidden="true" />
                                    </a>
                                    <h1 className="mt-4  tracking-tight uppercase  text-white sm:mt-5 sm:leading-none lg:mt-6 ">
                                        <span className="md:block font-extrabold text-4xl lg:text-5xl xl:text-6xl">Dionysus</span>{' '}
                                        <span className="text-fod-yellow md:block text-3xl lg:text-4xl xl:text-5xl">returns</span>
                                    </h1>
                                    <p className="mt-3 text-base text-gray-200 sm:mt-5 sm:text-base lg:text-base xl:text-base">
                                        Our vision is inspired by a simple desire: we want to create a sincere and sustainable community by building a real-life winery in Italy. Community members will get immediate, but also long-term benefits. <br /> <br />We are building for the future.
                                    </p>
                                    <p className="mt-8 text-sm text-gray-400 tracking-wide font-semibold sm:mt-10">Brought to you by</p>
                                    <div className="mt-5 w-full sm:mx-auto sm:max-w-lg lg:ml-0">
                                        <div className="flex flex-wrap items-start justify-between">
                                            <div className="flex justify-center px-1">
                                                <a href="https://craft-clarity.com" target="_blank"><img
                                                    className="h-6 sm:h-8 opacity-80"
                                                    src="/images/cc_logo.svg"
                                                    alt="Tuple"
                                                /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">

                                <div className="bg-fod-dark-bg sm:max-w-xl sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">

                                    <div className="px-8 py-10 sm:px-14">
                                        <div className='text-left'>
                                            <h2 className="text-xl tracking-wider text-white">Join our <span className="text-fod-yellow">pre-sale raffle</span></h2>

                                            <p className="text-xs leading-5 text-white mt-4">
                                                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                                            </p>
                                        </div>

                                        <div className="mt-6">
                                            <form className="space-y-6">
                                                <div className="pb-6">
                                                    <h3 className="text-sm tracking-wider text-white pb-4">1. Connect your wallet</h3>
                                                    <WalletMultiButton />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm tracking-wider text-white pb-4">2. Retweet this <a className="underline text-fod-yellow" href="https://twitter.com/fofdionysus/status/1485697512992395269?s=20">tweet</a> to double your chances.</h3>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm tracking-wider text-white pb-4">3. Provide addtional information.</h3>
                                                    <label htmlFor="name" className="sr-only">
                                                        Twitter Handle
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        autoComplete="name"
                                                        placeholder="Your Twitter handle"
                                                        onChange={(e) => handleTwitter(e)}
                                                        required
                                                        className="bg-fod-dark-bg text-white block w-64 shadow-sm focus:ring-fod-yellow focus:border-fod-yellow sm:text-sm border-gray-500 rounded-md mb-4"
                                                    />
                                                    <label htmlFor="email" className="sr-only">
                                                        Email Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        id="email"
                                                        autoComplete="email"
                                                        placeholder="Your Email Address"
                                                        onChange={(e) => handleEmail(e)}
                                                        required
                                                        className="bg-fod-dark-bg text-white block w-64 shadow-sm focus:ring-fod-yellow focus:border-fod-yellow sm:text-sm border-gray-500 rounded-md"
                                                    />
                                                    <span className="text-xs text-gray-500">Your email address is optional - it is only used to notify you when the mint starts. </span>
                                                </div>
                                                <div>
                                                    <label className="inline-flex items-left mt-3 max-w-lg">
                                                        <input type="checkbox" className="form-checkbox h-5 w-5 bg-gray-600 text-gray-600" onChange={() => handleCheckbox()} />
                                                        <span className="ml-4 -mt-1 text-left text-white text-xs leading-5 text-white">By clicking on the button below, you acknowledge you have read and agreed to our <a className="text-fod-yellow underline" href="https://friendsofdionysus.com/dataprivacy" target="_blank">Privacy Policy</a></span>
                                                    </label>


                                                </div>

                                                <div>
                                                    {!success ? (
                                                        <button
                                                            type="submit"
                                                            onClick={(e) => onSubmit(e)}
                                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-fod-button-blue hover:fod-button-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fod-button-blue"
                                                        >
                                                            {running ? <img width="20" src="/images/loading.svg" /> : 'Apply now'}
                                                        </button>) : (<span className="text-sm text-fod-pink">You have successfully applied to the pre-sale raffle -- #ChinCheerio 🍷</span>)}
                                                </div>
                                                {error ? <>
                                                    <div>
                                                        <span className="text-fod-yellow text-xs">⚠️ {error}</span>
                                                    </div>

                                                </> : null}
                                            </form>
                                        </div>
                                    </div>
                                    <div className="px-4 py-6 bg-fod-dark-bg  text-center  border-t-2 border-gray-600 sm:px-10">
                                        <p className="text-xs text-gray-400">
                                            If you encounter any issue ping us on <a href="https://discord.com/invite/kY3Fg8DDkk" target="_blank" className="underline text-fod-yellow">Discord</a>.
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
import { ChevronRightIcon } from '@heroicons/react/solid'
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useMemo, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

const navigation = []

const steps = [
    { id: '2x', name: 'Retweet this tweet to double your chances', href: 'https://twitter.com/fofdionysus/status/1485697512992395269', status: 'current' },
    { id: '3x (Upcoming)', name: 'Participate in the upcoming FoD meme contest', href: '#', status: 'upcoming' },
    { id: '4x (Upcoming)', name: 'NFT-holder of a collaboration partner', href: '#', status: 'upcoming' },
]

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
                                        href="https://friendsofdionysus.com" target="_blank" rel="noreferrer"
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
                                        Our vision is inspired by a simple desire: we want to create a sincere and sustainable community by building a real-life winery in Italy.
                                    </p>
                                    <div>
                                        <p className="text-base mt-3 text-gray-200 sm:mt-5 sm:text-base lg:text-base xl:text-base">
                                            The word raffle speaks for itself. There is an element of luck & randomness to the selection process. However, to reward special engagement and an active contribution to increase FoD's reach, we came-up with certain multipliers that will boost your chances to land a spot in the pre-sale.
                                        </p>

                                        <h3 className="text-base mt-3 text-gray-200 sm:mt-5 sm:text-base lg:text-base xl:text-base">The following activities will multiply your chances to hit one of the <strong>750 pre-sale slots</strong>. Every slot can buy <strong>2 NFTs</strong>.</h3>
                                        <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8 mt-10">
                                            {steps.map((step) => (
                                                <li key={step.name} className="md:flex-1">
                                                    {step.status === 'complete' ? (
                                                        <a
                                                            href={step.href}
                                                            className="group pl-4 py-2 flex flex-col border-l-4 border-fod-ping hover:border-fod-pink md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                                                        >
                                                            <span className="text-xs text-fod-pink font-semibold tracking-wide uppercase group-hover:text-fod-pink">
                                                                {step.id}
                                                            </span>
                                                            <span className="text-sm font-medium">{step.name}</span>
                                                        </a>
                                                    ) : step.status === 'current' ? (
                                                        <a
                                                            href={step.href}
                                                            className="pl-4 py-2 flex flex-col border-l-4 border-fod-pink md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                                                            aria-current="step"
                                                            target="_blank"
                                                            rel="nofollow"
                                                        >
                                                            <span className="text-sm text-fod-pink font-semibold tracking-wide uppercase">{step.id}</span>
                                                            <span className="text-sm font-medium text-white mt-1">{step.name}</span>
                                                        </a>
                                                    ) : (
                                                        <a
                                                            href={step.href}
                                                            className="group pl-4 py-2 flex flex-col border-l-4 border-gray-200 hover:border-gray-300 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                                                        >
                                                            <span className="text-sm text-gray-400 font-semibold tracking-wide uppercase group-hover:text-gray-300">
                                                                {step.id}
                                                            </span>
                                                            <span className="text-sm font-medium text-gray-400 mt-1">{step.name}</span>
                                                        </a>
                                                    )}
                                                </li>
                                            ))}
                                        </ol>
                                    </div>

                                </div>
                            </div>
                            <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">

                                <div className="bg-fod-dark-bg sm:max-w-xl sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">

                                    <div className="px-8 py-10 sm:px-14">
                                        <div className='text-left'>
                                            <h2 className="text-xl tracking-wider text-white">Join our <span className="text-fod-yellow">pre-sale raffle</span></h2>
                                        </div>

                                        <div className="mt-6">
                                            <form className="space-y-6">
                                                <div className="pb-6">
                                                    <h3 className="text-sm tracking-wider text-white pb-4">1. Connect your wallet</h3>
                                                    <WalletMultiButton />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm tracking-wider text-white pb-4">2. Tweet about the project.</h3>
                                                    <a href="https://twitter.com/intent/tweet?hashtags=SolanaNFTs&text=I%20just%20signed%20up%20for%20the%20presale%20raffle%20of%20%40fofdionysus.%F0%9F%8D%B7%20They%20work%20towards%20a%20real-life%20winery%20where%20everyone%20is%20a%20part%20of%20its%20creation%20process.%F0%9F%A4%AF%0AJoin%20their%20Discord%20if%20you%20have%20any%20questions%20and%20make%20sure%20to%20register%20for%20the%20presale%20at%20https%3A%2F%2Fget.friendsofdionysus.com!%20%F0%9F%99%8C" target="_blank" rel="nofollow" className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:ring-[#1da1f2]/50 font-bold rounded-lg text-sm px-8 py-3 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2">
                                                        <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"></path></svg>
                                                        Tweet
                                                    </a>
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
                                                        placeholder="(Optional) Email Address"
                                                        onChange={(e) => handleEmail(e)}
                                                        required
                                                        className="bg-fod-dark-bg text-white block w-64 shadow-sm focus:ring-fod-yellow focus:border-fod-yellow sm:text-sm border-gray-500 rounded-md"
                                                    />
                                                    <span className="text-xs text-gray-500">Your email address is optional - it is only used to notify you when the mint starts. </span>
                                                </div>
                                                <div>
                                                    <label className="inline-flex items-left mt-3 max-w-lg">
                                                        <input type="checkbox" className="form-checkbox h-5 w-5 bg-gray-600 text-gray-600 focus:border-transparent focus:ring-fod-yellow" onChange={() => handleCheckbox()} />
                                                        <span className="ml-4 -mt-1 text-left text-white text-xs leading-5 text-white">By clicking on the button below, you acknowledge you have read and agreed to our <a className="text-fod-yellow underline underline-offset-2" href="https://friendsofdionysus.com/dataprivacy" rel="noreferrer" target="_blank">Privacy Policy</a></span>
                                                    </label>


                                                </div>

                                                <div>
                                                    {!success ? (
                                                        <button
                                                            type="submit"
                                                            onClick={(e) => onSubmit(e)}
                                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-fod-button-blue hover:fod-button-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fod-button-blue"
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
                                            If you encounter any issue ping us on <a href="https://discord.com/invite/kY3Fg8DDkk" target="_blank" rel="noreferrer" className="underline underline-offset-2 text-fod-yellow">Discord</a>.
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
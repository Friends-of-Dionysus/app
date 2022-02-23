import { ChevronRightIcon } from '@heroicons/react/solid'

export default function WhitelistHero() {

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
                                <span className="sr-only">Friends of Dionysus</span>
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
                                            Every of the  <strong>500 pre-sale slots</strong> allows you to mint <strong>2 NFTs</strong>. <br /> <br /> If 500 slots are exceeded, you can still join and you will be part of our waiting list. <br /> <br />First come, first served!
                                        </p>

                                    </div>

                                </div>
                            </div>
                            <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">

                                <div className="bg-fod-dark-bg sm:max-w-xl sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">

                                    <div className="px-8 py-10 sm:px-14">
                                        <div className='text-center'>
                                            <h2 className="text-xl tracking-wider text-white">Pre sale registration <span className="text-fod-yellow">closed</span>.</h2>
                                        </div>

                                    </div>
                                    <div className="px-4 py-6 bg-fod-dark-bg  text-center  border-t-2 border-gray-600 sm:px-10">
                                        <p className="text-xs text-gray-400">
                                            Join us on <a href="https://discord.com/invite/kY3Fg8DDkk" target="_blank" rel="noreferrer" className="underline underline-offset-2 text-fod-yellow">Discord</a>.
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </main >
            </div >
        </div >
    )
}
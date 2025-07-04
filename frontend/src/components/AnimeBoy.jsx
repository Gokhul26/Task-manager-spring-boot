import React from 'react';

const AnimeBoy = () => {
    return (
        <div className="fixed left-4 bottom-4 z-50 animate-bounce-in" style={{ animationDelay: '2s' }}>
            <div className="relative">
                {/* Speech bubble */}
                <div
                    className="absolute -top-16 left-8 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border-2 border-pink-300/50 animate-fade-in opacity-0"
                    style={{ animationDelay: '3s', animationFillMode: 'forwards' }}
                >
                    <p className="text-sm text-gray-800 font-medium whitespace-nowrap">Welcome back! 🌟</p>
                    <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white/90 rotate-45 border-r-2 border-b-2 border-pink-300/50" />
                </div>

                {/* Anime boy character */}
                <div className="w-20 h-32 relative animate-float">
                    {/* Head */}
                    <div className="w-16 h-16 bg-gradient-to-b from-pink-200 to-pink-100 rounded-full mx-auto relative border-2 border-pink-300/30">
                        {/* Hair */}
                        <div className="absolute -top-2 -left-1 w-18 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-t-full" />
                        <div className="absolute -top-1 left-2 w-4 h-8 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full transform -rotate-12" />
                        <div className="absolute -top-1 right-2 w-4 h-8 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full transform rotate-12" />

                        {/* Eyes */}
                        <div className="absolute top-4 left-3 w-3 h-4 bg-gradient-to-b from-blue-400 to-blue-500 rounded-full animate-pulse" />
                        <div className="absolute top-4 right-3 w-3 h-4 bg-gradient-to-b from-blue-400 to-blue-500 rounded-full animate-pulse" />

                        {/* Eye shine */}
                        <div className="absolute top-4 left-4 w-1 h-1 bg-white rounded-full" />
                        <div className="absolute top-4 right-4 w-1 h-1 bg-white rounded-full" />

                        {/* Blush */}
                        <div className="absolute top-6 left-1 w-2 h-1 bg-pink-300 rounded-full opacity-60" />
                        <div className="absolute top-6 right-1 w-2 h-1 bg-pink-300 rounded-full opacity-60" />

                        {/* Smile */}
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-2 border-b-2 border-gray-600 rounded-full" />
                    </div>

                    {/* Body */}
                    <div className="w-12 h-16 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-lg mx-auto mt-1 relative">
                        {/* Arms */}
                        <div className="absolute -left-3 top-2 w-6 h-3 bg-gradient-to-r from-pink-200 to-pink-300 rounded-full transform rotate-12 animate-wiggle" />
                        <div
                            className="absolute -right-3 top-2 w-6 h-3 bg-gradient-to-r from-pink-200 to-pink-300 rounded-full transform -rotate-12 animate-wiggle"
                            style={{ animationDelay: '0.5s' }}
                        />

                        {/* Shirt details */}
                        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-gradient-to-b from-white to-gray-100 rounded-full" />
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-500 rounded-full" />
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-500 rounded-full" />
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-500 rounded-full" />
                    </div>
                </div>

                {/* Sparkles */}
                <div className="absolute -top-4 -right-2 text-yellow-400 text-sm animate-pulse">✨</div>
                <div className="absolute top-8 -left-4 text-pink-400 text-xs animate-pulse" style={{ animationDelay: '0.5s' }}>💫</div>
                <div className="absolute -bottom-2 right-2 text-purple-400 text-sm animate-pulse" style={{ animationDelay: '1s' }}>⭐</div>
            </div>
        </div>
    );
};

export default AnimeBoy;

import React from 'react'

const NewsLetterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // Here you can add logic to handle the email submission, such as sending it to your backend or an email marketing service.
    alert('Thank you for subscribing!');
  }
  return (
    <div className="my-16 px-4">
      <div className="max-w-2xl mx-auto text-center border rounded-lg p-8">

        <h2 className="text-2xl font-semibold mb-3">
          Subscribe to our Newsletter
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Get updates about new products and special offers
        </p>

        <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border rounded-md outline-none focus:ring-1 focus:ring-gray-400"
            required
          />

          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
          >
            Subscribe
          </button>
        </form>

      </div>
    </div>
  )
}

export default NewsLetterBox

var store = new Vue({
    el: '#app',
    data: {
        showProduct: true,
        sitename: 'After School Lessons',
        cart: [],
        sortBy: "subject",
        orderBy: 'ascending',
        searchValue: '',
        Lessons: lessons,
        checkout: {
            Name: "",
            Phone_No: null,
        },
    },

    methods: {
        //add a course to the cart
        addCourseToCart(lesson) {
            this.cart.push(lesson)
            if (lesson.spaces > 0) {
                --lesson.spaces
            }
        },
        //checks if course can be added to the cart
        canAddToCart(lesson) {
            return lesson.spacesAvailable > this.itemsInCart(lesson);
        },
        //remove a course from the cart
        removeCourseFromCart(lesson) {
            this.cart.splice(this.cart.indexOf(lesson.id));
            ++lesson.spaces
        },
        //takes you to checkout screen
        showCheckout() {
            this.showProduct = this.showProduct ? false : true;
        },
        //counts the number of items in the cart
        itemsInCart(id) {
            let count = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    count++
                }
            }
            return count;
        },
        //checks if the details submitted for the name and number are accurate
        isNumber() {
            let phoneNumber = document.getElementById("phone-number")
            let name = document.getElementById("name")
            let submitBtn = document.querySelector(".submitBtn")
            var integers = /^[0-9]+$/
            var letters = /^[A-Za-z]+$/
            if (phoneNumber.value.match(integers) && name.value.match(letters)) {
                alert('Your Registration number has accepted....');
                window.location.href = "/index.html"
                return true;
            }
            else {
                alert('Please input only numeric characters for Phone number and letters for Name');

                return false;
            }
        },

    },
    computed: {

        //count number of items in the cart
        cartItemCount: function () {
            return this.cart.length;
        },

        //sort lessons in ascending or descending order, or according to lesson properties
        sortLessons() {
            let lessonOrder = this.Lessons;

            lessonOrder = lessonOrder.sort((a, b) => {
                if (this.sortBy == "subject") {
                    let fa = a.subject.toLowerCase(), fb = b.subject.toLowerCase();

                    if (fa < fb) {
                        return -1
                    }
                    if (fa > fb) {
                        return 1
                    }
                }
                else if (this.sortBy == 'location') {
                    let fa = a.location.toLowerCase(), fb = b.location.toLowerCase();

                    if (fa < fb) {
                        return -1
                    }
                    if (fa > fb) {
                        return 1
                    }
                }
                return 0
            })
            if (this.sortBy == 'price') {
                lessonOrder = lessonOrder.sort((a, b) => {
                    return a.price - b.price
                })
            }
            if (this.sortBy == 'availability') {
                lessonOrder = lessonOrder.sort((a, b) => {
                    return a.spaces - b.spaces
                })
            }
            if (this.orderBy !== "ascending") {
                lessonOrder.reverse()
            }
            if (this.searchValue != '' && this.searchValue) {
                lessonOrder = lessonOrder.filter((item) => {
                    return item.subject
                        .toUpperCase()
                        .includes(this.searchValue.toUpperCase())
                })
            }
            return lessonOrder
        },
    }
})
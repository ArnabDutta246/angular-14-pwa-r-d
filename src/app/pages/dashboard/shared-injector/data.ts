import { ComponentOneComponent } from "../component-one/component-one.component";
import { ComponentThreeComponent } from "../component-three/component-three.component";
import { ComponentTwoComponent } from "../component-two/component-two.component";


export const ComponentSequence = {
    "1": [
        { sequence: 0, componentCode: 'COMPONENT_ONE', component: ComponentOneComponent, willBeShow: true },
        { sequence: 1, componentCode: 'COMPONENT_TWO', component: ComponentTwoComponent, willBeShow: true },
        { sequence: 2, componentCode: 'COMPONENT_THREE', component: ComponentThreeComponent, willBeShow: true }
    ],
    "2": [
        { sequence: 1, componentCode: 'COMPONENT_TWO', component: ComponentTwoComponent, willBeShow: true },
        { sequence: 2, componentCode: 'COMPONENT_THREE', component: ComponentThreeComponent, willBeShow: true },
        { sequence: 0, componentCode: 'COMPONENT_ONE', component: ComponentOneComponent, willBeShow: true }
    ],
    "3": [
        { sequence: 2, componentCode: 'COMPONENT_THREE', component: ComponentThreeComponent, willBeShow: true },
        { sequence: 0, componentCode: 'COMPONENT_ONE', component: ComponentOneComponent, willBeShow: true },
        { sequence: 1, componentCode: 'COMPONENT_TWO', component: ComponentTwoComponent, willBeShow: true }
    ]
};

export const Data = {
    "one": {
        "title": "Component One",
        "description": `One Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus minus omnis ipsum sit exercitationem voluptatem
        eum dolores nostrum dicta, voluptatum, beatae molestiae! Ex rerum qui vero distinctio quis amet libero temporibus
        dolorum unde hic a dolores, delectus praesentium dolorem eius ad. Laudantium repellat, a quae suscipit eius odit
        perspiciatis doloremque similique obcaecati, officiis quos repudiandae dolorum odio tenetur tempora distinctio
        nihil, at magnam ullam! Quo amet ullam corporis voluptatibus illum sapiente quis veniam deleniti enim inventore,
        quos possimus, nisi laboriosam repellendus rem nihil maxime molestiae omnis delectus vel ducimus ex ratione,
        accusamus iusto? Minima labore consequatur explicabo, ab dolorem recusandae.`
    },
    "two": {
        "title": "Component Two",
        "description": `Two Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus minus omnis ipsum sit exercitationem voluptatem
        eum dolores nostrum dicta, voluptatum, beatae molestiae! Ex rerum qui vero distinctio quis amet libero temporibus
        dolorum unde hic a dolores, delectus praesentium dolorem eius ad. Laudantium repellat, a quae suscipit eius odit
        perspiciatis doloremque similique obcaecati, officiis quos repudiandae dolorum odio tenetur tempora distinctio
        nihil, at magnam ullam! Quo amet ullam corporis voluptatibus illum sapiente quis veniam deleniti enim inventore,
        quos possimus, nisi laboriosam repellendus rem nihil maxime molestiae omnis delectus vel ducimus ex ratione,
        accusamus iusto? Minima labore consequatur explicabo, ab dolorem recusandae.`
    },
    "three": {
        "title": "Component Three",
        "description": `Three Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus minus omnis ipsum sit exercitationem voluptatem
        eum dolores nostrum dicta, voluptatum, beatae molestiae! Ex rerum qui vero distinctio quis amet libero temporibus
        dolorum unde hic a dolores, delectus praesentium dolorem eius ad. Laudantium repellat, a quae suscipit eius odit
        perspiciatis doloremque similique obcaecati, officiis quos repudiandae dolorum odio tenetur tempora distinctio
        nihil, at magnam ullam! Quo amet ullam corporis voluptatibus illum sapiente quis veniam deleniti enim inventore,
        quos possimus, nisi laboriosam repellendus rem nihil maxime molestiae omnis delectus vel ducimus ex ratione,
        accusamus iusto? Minima labore consequatur explicabo, ab dolorem recusandae.`
    }
}
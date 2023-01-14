import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

export default function ParticleBackground()  {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
      
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "#4f3770",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: false,
                            mode: "push",
                        },
                        onHover: {
                            enable: false,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                  number: {
                    value: 30,
                    density: {
                      enable: true,
                      value_area: 4656.191550985299
                    }
                  },
                  color: {
                    value: "#fff"
                  },
                  shape: {
                    type: "circle",
                    stroke: {
                      width: 0,
                      color: "#000000"
                    },
                    polygon: {
                      nb_sides: 4
                    },
                    image: {
                      src: "img/github.svg",
                      width: 100,
                      height: 100
                    }
                  },
                  opacity: {
                    value: 0.2998903032837989,
                    random: true,
                    anim: {
                      enable: false,
                      speed: 1,
                      opacity_min: 0.1,
                      sync: false
                    }
                  },
                  size: {
                    value: 252.53920276530434,
                    random: true,
                    anim: {
                      enable: false,
                      speed: 31.649421789409637,
                      size_min: 52.74903631568273,
                      sync: false
                    }
                  },
                  line_linked: {
                    enable: false,
                    distance: 284.10660311096734,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 2
                  },
                  move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                      enable: false,
                      rotateX: 600,
                      rotateY: 1200
                    }
                  }
                },
                interactivity: {
                  detect_on: "canvas",
                  events: {
                    onhover: {
                      enable: false,
                      mode: "bubble"
                    },
                    onclick: {
                      enable: false,
                      mode: "repulse"
                    },
                    resize: true
                  },
                  modes: {
                    grab: {
                      distance: 400,
                      line_linked: {
                        opacity: 0.5
                      }
                    },
                    bubble: {
                      distance: 400,
                      size: 4,
                      duration: 0.3,
                      opacity: 1,
                      speed: 3
                    },
                    repulse: {
                      distance: 200,
                      duration: 0.4
                    },
                    push: {
                      particles_nb: 4
                    },
                    remove: {
                      particles_nb: 2
                    }
                  }
                },
                retina_detect: true
                
            }}
        />
    );
};
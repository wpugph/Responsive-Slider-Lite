<?php
/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://carl.alber2.com/
 * @since      1.0.0
 *
 * @package    Responsive_Slider_Lite
 * @subpackage Responsive_Slider_Lite/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Responsive_Slider_Lite
 * @subpackage Responsive_Slider_Lite/public
 * @author     Carl Alberto <cgalbert01@gmail.com>
 */
class Responsive_Slider_Lite_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string $plugin_name       The name of the plugin.
	 * @param      string $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Responsive_Slider_Lite_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Responsive_Slider_Lite_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name . '2', plugin_dir_url( __FILE__ ) . 'css/responsive-slider-lite-public.css', array(), $this->version, 'all' );

		global $wp_styles;
		if ( $wp_styles instanceof WP_Styles ) {
			foreach ( $wp_styles->queue as $handle ) {
				$obj = $wp_styles->registered[ $handle ];
				if ( strpos( $obj->src, 'bootstrap' ) === false ) {
						wp_enqueue_style( $this->plugin_name . 'bootstrapcss', plugin_dir_url( __FILE__ ) . '/bootstrap/bootstrap-3.3.6-dist/css/bootstrap.min.css', array(), $this->version, 'all' );
							wp_enqueue_script( $this->plugin_name . 'bootstrapjs', plugin_dir_url( __FILE__ ) . '/bootstrap/bootstrap-3.3.6-dist/js/bootstrap.min.js', array( 'jquery' ), $this->version, false );
				}
			}
		}
	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Responsive_Slider_Lite_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Responsive_Slider_Lite_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/responsive-slider-lite-public.js', array( 'jquery' ), $this->version, false );

	}

}

/**
 * Contains the admin sorting functinos.
 *
 * @link       https://carl.alber2.com/
 * @since      1.0.0
 *
 * @package    Responsive_Slider_Lite
 */

var postTableToOrder = jQuery( '.wp-list-table tbody' );
var inlineEditPost;
var children;
var i;
var selector;
var postid;
var prevpostid;
var prevpost;
var nextpostid;
var nextpost;
var tableRows;
var tableRowCount;

postTableToOrder.sortable({
	items: '> tr',
	cursor: 'move',
	axis: 'y',
	containment: 'table.widefat',
	cancel:	'.inline-edit-row',
	distance: 2,
	opacity: 0.8,
	tolerance: 'pointer',
	start: function( e, ui ) {
		if ( 'undefined' !== typeof( inlineEditPost ) ) {
			inlineEditPost.revert();
		}
		ui.placeholder.height( ui.item.height() );

	},
	helper: function( e, ui ) {
		children = ui.children();
		for ( i = 0; i < children.length; i++ ) {
			selector = jQuery( children[i] );
			selector.width( selector.width() );
		}
		return ui;
	},
	stop: function( e, ui ) {
		ui.item.children().css( 'width', '' );
	},
	update: function( e, ui ) {
		postTableToOrder.sortable( 'disable' ).addClass( 'spo-updating' );
		ui.item.addClass( 'spo-updating-row' );

		postid = ui.item[0].id.substr( 5 );

		prevpostid = false;
		prevpost = ui.item.prev();
		if ( prevpost.length > 0 ) {
			prevpostid = prevpost.attr( 'id' ).substr( 5 );
		}

		nextpostid = false;
		nextpost = ui.item.next();
		if ( nextpost.length > 0 ) {
			nextpostid = nextpost.attr( 'id' ).substr( 5 );
		}

		jQuery.post( ajaxurl, { // jshint ignore:line
			action: 'responsive_slider_lite_ordering',
			id: postid,
			previd: prevpostid,
			nextid: nextpostid
		}, updateResponsiveSliderLiteOrderingCallback );

		tableRows = document.querySelectorAll( 'tr.iedit' );
		tableRowCount = tableRows.length;
		while ( tableRowCount-- ) {
			if ( 0 === tableRowCount % 2 ) {
				jQuery( tableRows[tableRowCount] ).addClass( 'alternate' );
			} else {
				jQuery( tableRows[tableRowCount] ).removeClass( 'alternate' );
			}
		}

	}
});

function updateResponsiveSliderLiteOrderingCallback( response ) {

	// Load temporary holder for json response.
	var changes = jQuery.parseJSON( response );
	var referencePosition;
	var updatedPosition;
	var inlineKey;
	var inlineReferencePosition;
	var domMenuOrder;
	var postTitle;
	var domPostTitle;
	var dashes;
	var domRowTitle;
	var domOfPostParent;

	// Make sure script only fires on children.
	if ( 'children' === response ) {
		window.location.reload();
		return;
	}

	updatedPosition = changes.updatedPosition;
	for ( referencePosition in updatedPosition ) {
		if ( 'next' === referencePosition ) {
			continue;
		}

		inlineKey = document.getElementById( 'inline_' + referencePosition );

		if ( null !== inlineKey && updatedPosition.hasOwnProperty( referencePosition ) ) {
			domMenuOrder = inlineReferencePosition.querySelector( '.menu_order' );

			if ( undefined !== updatedPosition[referencePosition]['.menu_order'] ) {
				if ( null !== domMenuOrder ) {
					domMenuOrder.innerHTML = updatedPosition[referencePosition]['.menu_order'];
				}

				domOfPostParent = inlineKey.querySelector( '.post_parent' );
				if ( null !== domOfPostParent ) {
					domOfPostParent.innerHTML = updatedPosition[referencePosition]['.post_parent'];
				}

				postTitle = null;
				domPostTitle = inlineReferencePosition.querySelector( '.postTitle' );
				if ( null !== domPostTitle ) {
					postTitle = domPostTitle.innerHTML;
				}

				dashes = 0;
				while ( dashes < updatedPosition[referencePosition]['.depth'] ) {
					postTitle = '&mdash; ' + postTitle;
					dashes++;
				}
				domRowTitle = inlineKey.parentNode.querySelector( '.row-title' );
				if ( null !== domRowTitle && null !== postTitle ) {
					domRowTitle.innerHTML = postTitle;
				}
			} else if ( null !== domMenuOrder ) {
				domMenuOrder.innerHTML = updatedPosition[referencePosition];
			}
		}
	}

	if ( changes.next ) {
		jQuery.post( ajaxurl, { // jshint ignore:line
			action: 'responsive_slider_lite_ordering',
			id: changes.next['.id'],
			previd: changes.next['.previd'],
			nextid: changes.next['.nextid'],
			start: changes.next['.start'],
			excluded: changes.next['.excluded']
		}, updateResponsiveSliderLiteOrderingCallback );
	} else {
		jQuery( '.spo-updating-row' ).removeClass( 'spo-updating-row' );
		postTableToOrder.removeClass( 'spo-updating' ).sortable( 'enable' );
	}
}
